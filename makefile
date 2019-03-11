.PHONY: api app up_all

api:
	docker-compose run api pipenv run dev

app:
	docker-compose run app yarn run dev

up_all:
	docker-compose up