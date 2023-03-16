const v = '0.3';
const Discord = require('discord.js');
const Tail = require('tail');

const configFilePath = process.argv[2];
const config = require(configFilePath);
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds] });

let testChannel = null;

client.on('ready', () => {
    if (testChannel == null) {
        testChannel = client.channels.cache.get(config.guildChatChannelId);
        testChannel.send(`online v${v}`);
    }
});

client.login(config.botToken);

const tail = new Tail.Tail(config.logFilePath);
tail.on('line', data => {
    if (testChannel != null && data.indexOf('tells the guild') > 0) {
        testChannel.send(data.substring(27).replace(' tells the guild', '').trim());
    }
});
