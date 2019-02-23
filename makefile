.PHONY: api app up_all

api:
	docker-compose run -rm api pipenv run dev

app:
	docker-compose run -rm app yarn run dev

up_all:
	docker-compose up