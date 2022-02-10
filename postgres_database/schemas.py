from pydantic import BaseModel


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
