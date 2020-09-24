echo Building bot
echo Building test file
node src/build-test.js
npm run build
sleep 1
echo Running test bot
node lib/test.js
echo test bot crashed