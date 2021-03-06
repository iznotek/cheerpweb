SHELL:=/bin/bash

.PHONY: prepare
prepare:
	if ! [[ -d node-v8.12.0-linux-x64 ]]; then \
		wget https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.xz && \
		tar -xvf node-v8.12.0-linux-x64.tar.xz && \
		cd node-v8.12.0-linux-x64/ && \
		sudo cp -pr * /usr/local/; \
	fi

.PHONY: build
build:
	npm install
	npm run build

.PHONY: dev
dev:
	npm run dev

.PHONY: api_dev
api_dev:
	cd docker_api && bash run_dev.sh

.PHONY: docker_api
docker_api:
	cd docker_api && bash build.sh

.PHONY: docker_web
docker_web:
	rsync -raP --delete dist docker_web/ && cd docker_web/ && bash build.sh

.PHONY: docker_api_publish
docker_api_publish:
	cd docker_api && bash publish.sh

.PHONY: docker_web_publish
docker_web_publish:
	cd docker_web && bash publish.sh

.PHONY: clean
clean:
	rm -rf dist/*.main.js dist/*.worker.js dist/css/ dist/main.js && rm -rf docker_web/dist

.PHONY: release
release: clean build docker_api docker_web docker_api_publish docker_web_publish
	echo OK, on the Kubernetes host execute: kubectl delete pod -l '"app in (cheerpapiapp, cheerpwebapp)"'
