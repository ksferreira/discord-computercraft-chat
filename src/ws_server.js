const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({ port: 8080 });

// (key, value) | (id, websocket)
const botMap = new Map();
const inputMap = new Map();
const monitorsMap = new Map(); // Optional; More than one possible

wss.on('connection', (ws, req, client) => {

	const connection = new URL(req.url, 'http://' + req.headers.host);
	const search_params = connection.searchParams;

	ws.type = search_params.get('type');
	ws.id = search_params.get('id');

	if (ws.type === 'bot' && botMap.size === 0) {
		botMap.set(ws, ws.id);
		console.log('Bot connected.')
	} else if (ws.type === 'input' && inputMap.size === 0) {
		inputMap.set(ws, ws.id);
		console.log('Input connected.')
	} else if (ws.type === 'monitor') {
		monitorsMap.set(ws, ws.id);
		console.log('Monitor Connected.')
	} else {
		ws.send('Invalid connection type.');
		return;
	};

	ws.on('message', message => {
		
		console.log(message);
		
		console.log(inputMap.size);

		if (botMap.has(ws)) {
			// Send chat data to monitors
			
			// Received message looks like this:
			// {
			// 	"author": author,
			// 	"content": message Content
			// }

			console.log(message);

			monitorsMap.forEach((value, wsConn) => {
				wsConn.send(message);
			});

			console.log(typeof(message));

			console.log('Sent message to monitors.')

		} else if (inputMap.has(ws) && botMap.size != 0) {
			// Send message to discord chat & monitors
			// Received a string containing JSON

			const [[botReceiver, botId]] = botMap;

			const msg = JSON.parse(message);

			console.log(msg.author)
			console.log(msg.content)
			
			botReceiver.send(JSON.stringify({
				"author": msg.author,
				"content": msg.content
			}));

			console.log('Sending message to discord.')

		} else {
			ws.send('Cannot send messages with this type.');
		}
	});

	ws.on('close', () => {
		if (botMap.has(ws)) {
			botMap.delete(ws);
			console.log('Bot removed.')
		} else if (inputMap.has(ws)) {
			inputMap.delete(ws);
			console.log('Input removed.');
		} else if (monitorsMap.has(ws)) {
			monitorsMap.delete(ws);
			console.log('Monitor removed.');
		};
	});

});


