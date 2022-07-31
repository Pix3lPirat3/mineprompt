var mineflayer = require('mineflayer');
var utils = require('./../utils.js');

const Movements = require('mineflayer-pathfinder').Movements;
const { GoalNear, GoalNearXZ, GoalBlock, GoalXZ, GoalY, GoalInvert, GoalFollow, GoalBreakBlock } = require('mineflayer-pathfinder').goals;
const pathfinder = require('mineflayer-pathfinder').pathfinder;

var moment = require('moment');
require('moment-precise-range-plugin');

var bot = null;

var formatterRegistered = false;

// Set everything in "commander" then load via bot.commander.<property>
var commander = require('../internal/addonManager');
commander.getCommands();

function startClient(options) {

	echo(`\n[[;#FFA500;]Connect] [[;#777777;]\u00bb] Connecting [[;#FFA500;]${options.username}] to [[;#FFA500;]${options.host}]..\n`)

	bot = mineflayer.createBot(options);

	bot.lastOptions = options; // Used in the 'reconnect' module

	bot.loadPlugin(pathfinder);

	// TODO: Disable building/breaking by default
	var defaultMove = new Movements(bot, bot.registry);
	defaultMove.allow1by1towers = false // Do not build 1x1 towers when going up
  	defaultMove.canDig = false // Disable breaking of blocks when pathing 
	bot.pathfinder.setMovements(defaultMove);

	bot.on('error', function(reason) {
		echo(`[Error] There was a client error:\n[[;#FF5555;]${reason}]`);
	})
	bot.on('kicked', function(reason) {
		echo(`[Kicked] The client was kicked:\n[[;#FF5555;]${reason}]`);
	})

	bot.on('spawn', function() {
		let pos = bot.entity.position.floored();
		echo(`[Events] [Spawn] ${bot.username} has spawned. (Position: X: ${pos.x}, Y: ${pos.y}, Z: ${pos.z})`)
	})

	var sessionStart, sessionEnd, sessionTimer, sessionRuntime;

	bot.once('spawn', function() {
		sessionStart = moment(Date.now());
		term.set_prompt(`${bot.username} \u00bb `)

		// Highlight the player's name when mentioned in chat (Optional: sound)

		if (!formatterRegistered) {
			$.terminal.new_formatter(function(string, options) {
				if (options.echo) return string.replace(new RegExp(bot.username || 'NULL', 'gi'), `[[;goldenrod;]${bot.username}]`);
			});
		}

		sessionTimer = setInterval(function() {
			sessionRuntime = moment.preciseDiff(sessionStart, Date.now());
			let pos = bot.entity.position.floored();
			$('#footer-left').text(`Runtime: ${sessionRuntime}`);
			$('#footer-right').text(`Health: ${bot.health} | Hunger: ${bot.food} | Position: ${pos}`);
		}, 1000)
	})

	bot.once('end', function(reason) {
		bot.entity = null;
		if (chatLogger) chatLogger.end();
		sessionTimer = clearInterval(sessionTimer);
		echo(`\n[End]\n\n[[;#FF5555;]Session Ended]\n${bot.username}'s connection ended: [[;#FF5555;]${reason}]\nSession Runtime: [[;goldenrod;]${sessionRuntime}]\n`)
		$('#footer-left').text(`OFFLINE`);
		$('#footer-right').text(`Runtime: ENDED`);
	})

	bot.on('death', function() {
		echo(`[Death] You died..`)
	})

	bot.on('entitySpawn', function(e) {
		if (e.type !== 'player' || e.username === bot.username) return;
		var distance = Math.floor(bot.entity.position.distanceTo(e.position));
		echo(`[PlayerSpawn] I see ${e.username}, they are ${distance} blocks away`)
	})

	bot.on('entityGone', function(e) {
		if (e.type !== 'player' || e.username === bot.username) return;
		var distance = Math.floor(bot.entity.position.distanceTo(e.position));
		echo(`[PlayerSpawn] I no longer see ${e.username}, they were ${distance} blocks away`)
	});

	// Chat Listener
	var chatPattern = /^(?:\[?(.*?)?\])?\s?(?:\[?(.*?)?\])?\s?([A-Za-z0-9_][^\s]*)\s?(?:\[?(.*?)?\])?\s?(?::|»|>>) (.*)/
	bot.on('messagestr', function(message) {
		if (!chatPattern.test(message)) {
			echo(`» ${message}`)
			return;
		}
		var parts = chatPattern.exec(message);

		var group = parts[1];
		var tag = parts[2];
		var displayname = parts[3];
		var suffix = parts[4];
		var message = parts[5];

		bot.emit('chat:formatted', group, tag, displayname, suffix, message);

	})

	var dateMonthDayYear = new Date().toLocaleString().split(',')[0].replaceAll('/', '-'); // M-DD-YYYY
	let chatLogger; // Opened once chat is spoken, saves on files and memory.

	bot.on('chat:formatted', function(group, tag, username, suffix, message) {
		if (!chatLogger) chatLogger = fs.createWriteStream(`chat-${dateMonthDayYear}.logs`, { flags: 'a', encoding: 'UTF-8' }); // Only open if needed

		message = message.replaceAll('§', ''); // Remove the Minecraft (Minecraft uses § in the backend) color codes from the message
		echo(`[Chat] [${group}] ${username} » ${message}`);
		chatLogger.write(`[${group}] ${username} » ${message}\n`);
	})

}

function loadAddons() {

}