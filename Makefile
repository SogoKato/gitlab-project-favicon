gen_chrome:
	mkdir -p ./dist/chrome/src
	cp -r ./src/* ./dist/chrome/src
	cat ./src/manifest.json | jq "del(.browser_specific_settings)" > ./dist/chrome/src/manifest.json

get_version:
	$(eval VERSION := $(shell jq -r ".version" src/manifest.json))

zip_firefox: get_version
	cd ./src; zip $(VERSION).zip -x "*.zip*" -r ./*
	mkdir -p ./dist/firefox
	mv ./src/${VERSION}.zip ./dist/firefox/

zip_chrome: gen_chrome get_version
	cd ./dist/chrome/src; zip ${VERSION}.zip -x "*.zip*" -r ./*
	mkdir -p ./dist/chrome
	mv ./dist/chrome/src/${VERSION}.zip ./dist/chrome/
