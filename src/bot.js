const WebSocket = require('ws');
const Discord = require('discord.js');

require('dotenv').config();

const client = new Discord.Client();
const ws = new WebSocket('ws://localhost:8080?type=bot&id=8080');

let mainChannel;
let lastMsg;

client.on('ready', () => {

	client.on('message', message => {

		if (!mainChannel) {
			mainChannel = message.channel;
			console.log(`Set main channel to: ${mainChannel.id}`);
		};

		if (message.channel != mainChannel) return;

		if (message.author.bot && lastMsg) {
			console.log(lastMsg);
			ws.send(JSON.stringify({
				"author": lastMsg.author,
				"content": lastMsg.content
			}));
		} else {
			ws.send(JSON.stringify({
				"author": message.author.username,
				"content": message.content
			}));
		};
	})
});

// This should be in the following JSON format.
// {
// 	"author": author,
// 	"content": content
// }
ws.on('message', msg => { 
	if (!mainChannel) return;

	const obj = JSON.parse(msg);
	const author = obj.author
	const content = obj.content

	lastMsg = obj

	mainChannel.send(`${author}: ${content}`);

});

client.login(process.env.TOKEN);