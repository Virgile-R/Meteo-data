from sqlalchemy import create_engine
import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
load_dotenv()

# defines a SQLDatabase Adress (defined in environnement variable for dev)
SQLALCHEMY_DATABASE_URL = os.getenv('DATABASE_URL')

# creates an SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# create a new SessionLocal class, which spawns a database session when invoked
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# New Base class from which models will inherit
Base = declarative_base()
