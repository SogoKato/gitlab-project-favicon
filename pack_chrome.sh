mkdir -p ./tmp-chrome
cp -r ./src/* ./tmp-chrome
cp ./tmp-chrome/manifest.json ./tmp-chrome/manifest.tmp.json
cat ./tmp-chrome/manifest.tmp.json | jq ".manifest_version = 3 | .action=.browser_action | del(.browser_specific_settings, .browser_action)" > ./tmp-chrome/manifest.json
rm ./tmp-chrome/manifest.tmp.json
