FROM python:3.6-alpine

RUN mkdir /app && pip install pipenv

WORKDIR /app

COPY ./Pipfile ./
COPY ./Pipfile.lock ./

RUN pipenv install

COPY . .


ENTRYPOINT ["pipenv", "run"]
CMD ["production"]
