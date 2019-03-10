#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

Base = declarative_base()

DATABASE_URL = os.environ.get('DATABASE_URL')
ECHO_LOG = False
engine = create_engine(
    RDB_PATH, echo=ECHO_LOG
)
Session = sessionmaker(bind=engine)
session = Session()