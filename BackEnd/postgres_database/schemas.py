import email
from os import access
from pydantic import BaseModel


class UserInfoBase(BaseModel):
    username: str
    email: str
    favorite_station: int | None


class UserCreate(UserInfoBase):
    password: str


class UserInfo(UserInfoBase):
    id: int


class UserAuthenticate(BaseModel):
    username: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: str | None = None


class TemperaturesBase(BaseModel):
    id: int
    station_id: int
    temperature: float
    year: int


class Temperatures(TemperaturesBase):
    id: int
    station_id: int
    temperature: float
    year: int

    class Config:
        orm_mode = True


class StationsBase(BaseModel):
    station_id: int
    station_name: str
    temperature: list[Temperatures] = []


# for future developpement
class StationsAdd(StationsBase):
    pass


# for future developpement


class TemperaturesAdd(TemperaturesBase):
    pass


class Stations(StationsBase):
    station_name: str
    temperature: list[Temperatures] = []

# see https://fastapi.tiangolo.com/tutorial/sql-databases/#create-the-pydantic-models for ORM Mode (TLDR, SQLAlchemy doesnt load the attribute of relationships by default)

    class Config:
        orm_mode = True
