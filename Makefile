install:
	npm ci

test:
	npm test

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

fix-lint:
	npx eslint . --fix

link:
	npm link

.PHONY: test
