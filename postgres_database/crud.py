from sqlalchemy.orm import Session

from postgres_database import models


def get_station(db: Session, station_id: int):
    return db.query(models.Stations).filter(models.Stations.id == station_id).first()


def get_stations(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Stations).offset(skip).limit(limit).all()


def get_temperature_per_year(db: Session, year: int = 2019):
    return db.query(models.Temperatures).filter(models.Temperatures.year == year).all()


def get_station_temperature_per_year(db: Session, station_id: int, year: int):
    station = db.query(models.Stations).filter(
        models.Stations.id == station_id).first()

    temp_for_year = station.temperature
    temp_station_year = []

    for o in temp_for_year:
        if o.year == year:
            temp_station_year.append(o)

    return temp_station_year
