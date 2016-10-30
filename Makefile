
run: build docker-run

NPM := product-page product-search basket ui
.PHONY: all $(NPM)

$(NPM):
	$(MAKE) -C $@

stop: docker-stop
clean: docker-stop
	docker-compose down

build: $(NPM) docker

# Docker control
docker:
	docker-compose build --no-cache

docker-run: docker-starter
	docker-compose up -d rabbitmq
	sleep 8
	docker-compose up -d ui

docker-starter:
	docker-compose up -d rabbitmq
	sleep 8
	docker-compose up -d photon
	sleep 8

docker-stop:
	docker-compose stop

redeploy: build dockerclean docker docker-run

dockerclean:
	docker-compose down
	docker-compose rm -f --all
