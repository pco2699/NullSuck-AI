FROM python:3.6-alpine

RUN apk --no-cache --update-cache add gcc gfortran python python-dev py-pip build-base wget freetype-dev libpng-dev openblas-dev mariadb-dev && \
    mkdir /app && \
    pip install pipenv

ENV PIPENV_VENV_IN_PROJECT=1
WORKDIR /app

COPY ./Pipfile ./Pipfile.lock ./

RUN pipenv install

COPY . .


CMD ["pipenv","run", "prod"]
