# Chrome extension for data labeling
This extension allows for the easy labeling of youtube comment data

# Develpment
Run in watch mode
- npm run watch

# Building for production
Build to /dist
- npm run build-prod
- refresh at chrome://extensions/ to update, webpack rebuilds after every change to the extension

Zip for upload to chrome store
- cd /dist
- zip -r ../insightor-data-log.zip .

