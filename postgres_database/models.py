
from sqlalchemy import Column, ForeignKey, Integer, String, Float, true
from sqlalchemy.orm import relationship

from .database import Base


class Stations(Base):
    __tablename__ = "stations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    temperature = relationship(
        "Temperatures", back_populates="temperature_for_station")


class Temperatures(Base):
    __tablename__ = "temperatures"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    temperature = Column(Float, index=True)
    station_id = Column(Integer, ForeignKey("stations.id"))
    year = Column(Integer, index=True)

    temperature_for_station = relationship(
        "Stations", back_populates="temperature")


class UserInfo(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    favorite_station = Column(Integer)
