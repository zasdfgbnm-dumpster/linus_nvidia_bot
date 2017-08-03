const gen = require('./generate.js');
const fs = require('fs');
const os = require('os');
const TelegramBot = require('node-telegram-bot-api');

const token = fs.readFileSync(os.homedir() + '/secrets/linus_nvidia_bot', 'ascii').trim();

const bot = new TelegramBot(token, { polling: true });

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	gen.getOrGenerate(msg.text, function(filename) {
		bot.sendVideo(msg.chat.id, fs.createReadStream(filename));
	});
});
