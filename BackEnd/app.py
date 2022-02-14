
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from postgres_database import models, crud, schemas
from postgres_database.database import SessionLocal, engine
import os
models.Base.metadata.create_all(bind=engine)
load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
app = FastAPI()


origins = [
    "http://localhost:3000",
    "https://meteo-data.vercel.app"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def read_root():
    return {"Welcome to Meteo data"}


@app.post('/token', response_model=schemas.Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.check_username_and_password(
        db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(
        minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")))
    access_token = crud.create_jwt_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.post("/user/signup")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=400, detail="An account with this email already exists")
    return crud.create_user(db=db, user=user)


@app.get("/user", response_model=schemas.UserInfoBase)
async def return_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    current_user = crud.get_current_user(db, token)
    return current_user


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
