require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const discord = require('discord.js'); //discord dependency
const client = new discord.Client(); //discord client
PREFIX = process.env.PREFIX;
ADMIN_PREFIX = process.env.ADMIN_PREFIX;
client.login(process.env.BOT_TOKEN); //use bot token from env file
client.commands = new Map();
client.on('ready', () => {
    console.log(`${client.user.tag} has logged on`);
});

//check if command is in a valid format
const isCmd = (message, cmdName) => message.content.toLowerCase().startsWith(PREFIX + cmdName);
//check if command is a valid admin level command
const isAdminCmd = (message, cmdName) =>
message.content.toLowerCase().startsWith(ADMIN_PREFIX + cmdName);
//flip a coin
const flipCoin = () => Math.floor(Math.random() * 2);
//roll a d20
const rollD20 = () => Math.floor(Math.random() * 20) + 1;

client.on('message', function(message) {
    if(message.author.bot) return; //don't reply if bot
    //give user attention
    if(isCmd(message, "givemeattention")) {
        message.reply("here is some attention :heart:");
    }
    //thank user: coffee
    else if(isCmd(message, "thankcoffee")) {
        message.channel.send("Thank you <@436080095023595520>");
    }
    //hug user: Fernocity
    else if(isCmd(message, "hugadam")) {
        message.channel.send("*hugs* <@194303355470872576>");
    }
    //list films
    else if(isCmd(message, "fratx")) {
        message.channel.send("(T)Pretty Boy Pounded - Oct 11, 2017\n(B)Beat That Ass - Oct 25, 2017\n(T)Party Up In Here - Nov 8, 2017\n(B)Smoke More Bitch Less - Nov 22, 2017\n(T)Tag In, Tag Out - Dec 6, 2017\n(B)Straight Up Gay - Jan 31, 2018");
    }
    //flip coin
    else if(isCmd(message, "flipcoin")) {
        let flip = flipCoin();
        if(flip == 0) {
            message.reply("top");
        } 
        else {
            message.reply("bottom");
        }
    }
    //roll d20
    else if(isCmd(message, "rolld20")) {
        message.reply("rolled a " + rollD20());
    }
    
});

(async function registerCommands(dir = 'commands') {
    //read directory
    let files = await fs.readdir(path.join(__dirname, dir));
    console.log(files);
    //loop through files
    for(let file of files) {
        let stat = await fs.lstat(path.join(__dirname, dir, file));
        if(stat.isDirectory())
            registerModels(path.join(dir, file));
        else {
            if(file.endsWith(".js")) {
                let cmdName = file.substring(0, file.indexOf(".js"));
                let cmdModule = require(path.join(__dirname, dir, file));
                client.commands.set(cmdName, cmdModule);
            }
        }
    }
})()

//checks if user is 18+ and allows access to nsfw channels
function check18Plus(message) {
    let args = message.content.substring();
    let { cache } = message.guild.roles;
    let role = cache.find(role => "18+");

    //if 18+ {
        message.member.roles.add(role).catch(err => {
            console.log(err);
        });
    //}
    //else {
        //do nothing
    //}

}