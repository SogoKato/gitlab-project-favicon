mkdir ./tmp-chrome
cp -r ./src/* ./tmp-chrome
sed -i -e 's/"manifest_version": 2/"manifest_version": 3/' ./tmp-chrome/manifest.json
cp ./tmp-chrome/manifest.json ./tmp-chrome/manifest.tmp.json
cat ./tmp-chrome/manifest.tmp.json | jq "del(.browser_specific_settings)" > ./tmp-chrome/manifest.json
rm ./tmp-chrome/manifest.tmp.json
