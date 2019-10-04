FROM kennethreitz/pipenv

WORKDIR /app

RUN apt-get update && apt-get install -y python3-dev

COPY . /app


CMD ["pipenv","run", "prod"]
