
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
import bcrypt
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta, timezone
from postgres_database import models, schemas
from dotenv import load_dotenv
import jwt
import os

load_dotenv()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


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


def check_username_and_password(db: Session, username: str, password: str):
    db_user_info: models.UserInfo = get_user(db, username)
    if not db_user_info:
        return False
    if not bcrypt.checkpw(password.encode('utf-8'), db_user_info.password.encode('utf-8')):
        return False
    return db_user_info


def create_jwt_token(*, data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.getenv(
        "SECRET_KEY"), algorithm=os.getenv("ALGORITHM"))
    return encoded_jwt

# https://stackoverflow.com/questions/68811220/handling-the-token-expiration-in-fastapi


def get_current_user(db: Session, token: str = Depends(oauth2_scheme)):
    credentials_exception_not_found = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not find user",
        headers={"WWW-Authenticate": "Bearer"},
    )
    credentials_exception_invalid = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    credentials_exception_expired = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Token Expired",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, os.getenv(
            "SECRET_KEY"), algorithms=[os.getenv("ALGORITHM")])
        username: str = payload.get("sub")
        expires: datetime = payload.get("exp")
        if username is None:
            raise credentials_exception_not_found
        token_data = schemas.TokenData(user=username, expires=expires)
        user = get_user(db, username=token_data.user)

        if user is None:
            raise credentials_exception_not_found

        if expires is None:
            raise credentials_exception_invalid
        if datetime.now(timezone.utc) > token_data.expires:
            raise credentials_exception_expired
        return user
    except jwt.exceptions.ExpiredSignatureError:
        raise credentials_exception_expired
    except jwt.exceptions.InvalidTokenError:
        raise credentials_exception_invalid


async def get_current_active_user(current_user: models.UserInfo = Depends(get_current_user)):
    if not current_user:
        raise HTTPException(status_code=400, detail="No User")
    return current_user


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
