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
DB_URL = 'mysql://', DB_USER + ':' + DB_PASSWORD + '@' + DB_HOST + ':3306'

ECHO_LOG = False
engine = create_engine(
    DB_URL, echo=ECHO_LOG
)
Session = sessionmaker(bind=engine)
session = Session()