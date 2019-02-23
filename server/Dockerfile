FROM python:3.6-alpine

RUN mkdir /app && pip install pipenv

WORKDIR /app

COPY . .
RUN pipenv install

ENTRYPOINT ["pipenv", "run"]
CMD ["python", "hello_world.py"]
