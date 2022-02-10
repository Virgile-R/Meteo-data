
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from postgres_database import models, crud, schemas
from postgres_database.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Welcome to Meteo data"}


@app.get("/stations")
def get_stations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    stations = crud.get_stations(db, skip, limit)
    return stations


@app.get("/stations/{station_id}")
def get_station(db: Session = Depends(get_db), station_id: int = 7005):
    station = crud.get_station(db, station_id)
    return station


@app.get("/stations/{station_id}/{year}")
def get_stations(db: Session = Depends(get_db), station_id: int = 7005, year: int = 2019):
    station_temp = crud.get_station_temperature_per_year(db, station_id, year)

    return station_temp


@app.get("/temperatures/{year}")
def get_temperature_per_year(db: Session = Depends(get_db), year: int = 2019):
    temperature = crud.get_temperature_per_year(db, year)
    print(type(temperature))
    if len(temperature) == 0:
        raise HTTPException(status_code=404, detail="No data for this year")
    return temperature
