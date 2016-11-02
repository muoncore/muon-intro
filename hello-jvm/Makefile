
all: package

package:
	./gradlew bootRepackage

clean:
	./gradlew clean

test:
	./gradlew test

docker:
	docker build . -t molecule-core

docker-release: package docker
	docker tag molecule-core simplicityitself-muon-image.jfrog.io/molecule-core:latest
	docker push simplicityitself-muon-image.jfrog.io/molecule-core:latest
