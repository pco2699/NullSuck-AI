#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

Base = declarative_base()

DB_USER = os.environ.get('DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD')
DB_HOST = os.environ.get('DB_HOST')
DB_NAME = os.environ.get('DB_NAME')

DB_URL = "mysql://{0}:{1}@{2}:3306".format(DB_USER, DB_PASSWORD, DB_HOST)

ECHO_LOG = True
engine = create_engine(
    DB_URL, echo=ECHO_LOG
)

# Query for existing databases
existing_databases = engine.execute("SHOW DATABASES;")
# Results are a list of single item tuples, so unpack each tuple
existing_databases = [d[0] for d in existing_databases]

# Create database if not exists
if DB_NAME not in existing_databases:
    engine.execute("CREATE DATABASE {0} DEFAULT CHARACTER SET 'utf8' ".format(DB_NAME))

DB_URL = "mysql://{0}:{1}@{2}:3306/{3}?charset=utf8&use_unicode=1".format(DB_USER, DB_PASSWORD, DB_HOST, DB_NAME)

engine = create_engine(
    DB_URL, echo=ECHO_LOG, convert_unicode=True
)

Session = sessionmaker(bind=engine)
session = Session()
