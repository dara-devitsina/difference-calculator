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

publish:
	npm publish --dry-run

link:
	npm link

.PHONY: test
