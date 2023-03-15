const v = '0.2';
const Discord = require('discord.js');
const Tail = require('tail');
const Fs = require('fs');

const configFilePath = process.argv[2];
const config = JSON.parse(Fs.readfileSync(configFilePath));
const guildChatChannelId = config.guildChatChannelId;
const logFilePath = config.logFilePath;
const botToken = config.botToken;

const client = new Discord.Client;
let testChannel = null;

client.on('ready', () => {
    if (testChannel == null) {
        testChannel = client.channels.get(guildChatChannelId);
        testChannel.send(`online v${v}`);
    }
});

client.login(botToken);

const tail = new Tail.Tail(logFilePath);
tail.on('line', data => {
    if (testChannel != null && data.indexOf('tells the guild') > 0) {
        testChannel.send(data.substring(27).replace(' tells the guild', '').trim());
    }
});
