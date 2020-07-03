install:
	npm install

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish --dry-run
