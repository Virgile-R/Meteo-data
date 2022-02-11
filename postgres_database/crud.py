
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
import bcrypt
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from postgres_database import models, schemas
from dotenv import load_dotenv
import jwt
import os
load_dotenv()


oath2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(
        user.password.encode('utf-8'), bcrypt.gensalt())
    # this is a bug in py-bcrypt : https://stackoverflow.com/questions/34548846/flask-bcrypt-valueerror-invalid-salt/37032208
    decoded_hashed_password = hashed_password.decode('utf8')
    db_user = models.UserInfo(username=user.username, email=user.email,
                              password=decoded_hashed_password, favorite_station=user.favorite_station)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, username: str):
    return db.query(models.UserInfo).filter(models.UserInfo.username == username).first()


def check_username_and_password(db: Session, user: schemas.UserAuthenticate):
    db_user_info: models.UserInfo = get_user(db, username=user.username)
    return bcrypt.checkpw(user.password.encode('utf-8'), db_user_info.password.encode('utf-8'))


def create_jwt_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv(
        "SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt


async def get_current_user(db: Session, token: str = Depends(oath2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, os.getenv(
            "SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
        email: str = payload.get("sub")
        token_data = schemas.TokenData(email=email)
        user = get_user(db, email=token_data.email)
        if user is None:
            raise credentials_exception
        return user
    except jwt.exceptions.InvalidTokenError:
        raise credentials_exception


def get_station(db: Session, station_id: int):
    station = db.query(models.Stations).filter(
        models.Stations.id == station_id).first()
    station.temperature = station.temperature
    return station


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
