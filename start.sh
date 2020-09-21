while true
do
echo building from src
npm run build
echo Starting bot
nodemon lib/bot.js
echo restarting bot in 5 seconds...
sleep 5
done