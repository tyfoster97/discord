const discord = require('discord.js'); //discord dependency
const client = new discord.Client(); //discord client
require('dotenv').config();

client.login(process.env.BOT_TOKEN); //use bot token from env file