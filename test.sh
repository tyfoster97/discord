echo Building bot
npm run build
echo Building test file
node lib/build-test.js
echo Running test bot
node lib/test.js
echo test bot crashed