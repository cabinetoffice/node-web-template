.PHONY: build start test coverage

NODE_VERSION := v18.17.1
PREFIX := CHANGE-ME
TIMESTAMP := $(shell date +"%Y-%m-%d_%H-%M-%S")


build:
	$(info Node version: $(NODE_VERSION))
	npm ci --silent
	npm run build

start:

test:
	npm run test

coverage:
	rm -rf ./coverage
	npm run coverage