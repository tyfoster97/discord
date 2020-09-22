while true
do
echo Building bot
npm run build
echo Starting bot
nodemon lib/bot.js
echo restarting bot in 5 seconds...
sleep 5
done