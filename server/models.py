#!/usr/bin/python
# -*- coding: utf-8 -*-

from numpy import genfromtxt
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.mysql import INTEGER, FLOAT
from db_config import Base, engine, session
from marshmallow_sqlalchemy import ModelSchema
from sqlalchemy.orm import relationship


def load_data(file_name):
    data = genfromtxt(file_name, delimiter=',', skip_header=1,
                      dtype=[('col1', 'i2'), ('col2', 'U32'), ('col3', 'S32'), ('col4', 'f8'), ('col5', 'f8'), ('col6', 'f8')])
    return data.tolist()


class WineAttribute(Base):
    __tablename__ = 'wine_attributes'

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True
    )
    japanese_title = Column(String(256))
    english_title = Column(String(256))
    max_value = Column(FLOAT)
    min_value = Column(FLOAT)
    step = Column(FLOAT)

class WineAttributeSchema(ModelSchema):
    class Meta:
        model = WineAttribute

class Post(Base):
    __tablename__ = 'posts'

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True
    )
    attribute_id = Column(INTEGER(unsigned=True), ForeignKey("wine_attributes.id"))
    value = Column(FLOAT)

    prediction_id = Column(INTEGER(unsigned=True), ForeignKey("predictions.id"))

    prediction = relationship("Prediction", foreign_keys=[prediction_id])
    attribute = relationship("WineAttribute", foreign_keys=[attribute_id])

class Prediction(Base):
    __tablename__ = 'predictions'

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True
    )

    prediction_value = Column(FLOAT)
    evaluation_id = Column(INTEGER(unsigned=True), ForeignKey("evaluations.id"))

    evaluation = relationship("Evaluation", foreign_keys=[evaluation_id])

class Evaluation(Base):
    __tablename__ = 'evaluations'

    id = Column(
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True
    )

    content = Column(String(256))
    max_value = Column(FLOAT)
    min_value = Column(FLOAT)

def main():
    if not engine.dialect.has_table(engine, 'wine_attributes'):
        Base.metadata.create_all(engine)

        try:
            file_name = "wine_attributes.csv"
            data = load_data(file_name)

            for i in data:
                record = WineAttribute(**{
                    'japanese_title': i[1],
                    'english_title': i[2],
                    'step': float(i[3]),
                    'max_value': float(i[4]),
                    'min_value': float(i[5])
                })
                session.add(record)

            session.commit()
        except Exception as e:
            print(e)
            session.rollback()
        finally:
            session.close()


if __name__ == '__main__':
    main()

