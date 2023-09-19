.PHONY: build

NODE_VERSION := v18.17.1

build:
	$(info Node version: $(NODE_VERSION))
	npm ci --silent
	npm run build
