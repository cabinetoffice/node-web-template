.PHONY: build lint test

NODE_VERSION_SUPPORTED := >=18.0.0
NODE_VERSION=$(shell node -v)

build:
	$(info Node version supported: $(NODE_VERSION_SUPPORTED))
	$(info Node version installed: $(NODE_VERSION))
	npm ci --silent
	npm run build

lint:
	npm run lint

test:
	npm run test