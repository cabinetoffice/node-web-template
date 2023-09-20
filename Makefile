.PHONY: build lint test

NODE_VERSION := v18.17.1

build:
	$(info Node version: $(NODE_VERSION))
	npm ci --silent
	npm run build

lint:
	npm run lint

test:
	npm run test