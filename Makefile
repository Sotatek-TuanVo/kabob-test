docker-build:
	docker-compose up -d
start:
	docker-compose exec web sh -c 'ng serve --host 0.0.0.0 --disable-host-check'