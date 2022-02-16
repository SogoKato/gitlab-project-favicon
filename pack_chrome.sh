cp -r ./src ./tmp-chrome
sed -i -e 's/"manifest_version": 2/"manifest_version": 3/' ./tmp-chrome/manifest.json
