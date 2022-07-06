var mineflayer = require('mineflayer');
const fs = require('fs');

const Movements = require('mineflayer-pathfinder').Movements;
const pathfinder = require('mineflayer-pathfinder').pathfinder;

var moment = require('moment');
require('moment-precise-range-plugin');

var bot;

var formatterRegistered = false;

function startClient(options) {
	bot = mineflayer.createBot(options);

	bot.lastOptions = options; // Used in the 'reconnect' module

	bot.loadPlugin(pathfinder);

	var defaultMove = new Movements(bot, bot.registry);
	bot.pathfinder.setMovements(defaultMove);

	bot.on('error', function(reason) {
		term.echo(i18n.t('events.error', { reason: reason }));
	})
	bot.on('kicked', function(reason) {
		term.echo(i18n.t('events.kicked', { reason: reason }));
	})

  bot.loadPlugin(require('../internal/addonManager.js'))
  bot.commander.load()

	bot.on('spawn', function() {
		term.echo(i18n.t('events.spawn', { bot: bot, pos: bot.entity.position.floored() }));
	})

	var sessionStart, sessionEnd, sessionTimer, sessionRuntime;

	bot.once('spawn', function() {
		$('#runtime').removeClass('flash-red');
		sessionStart = moment(Date.now());
		term.set_prompt(`${bot.username} \u00bb `)

		// Highlight the player's name when mentioned in chat (Optional: sound)

		if(!formatterRegistered) {
	    $.terminal.new_formatter(function(string, options) {
	      if (options.echo) return string.replace(new RegExp(bot.username || 'NULL', 'gi'), i18n.t('misc.chat.highlight', { username: bot.username || 'NULL' }));
	    });
		}

		sessionTimer = setInterval(function() {
			// Object.entries(bot.entity.position.floor()).map(([a, b]) => `${a.toUpperCase()}: ${b}`).join(', ') // => 'X: 1348, Y: 62, Z: 1352'
			sessionRuntime = moment.preciseDiff(sessionStart, Date.now());
			$('#footer-left').text(i18n.t('footer.left.running', { bot: bot, runtime: sessionRuntime, pos: bot.entity.position.floor().toArray().join(', ') }))
			$('#footer-right').text(i18n.t('footer.right.running', { bot: bot, runtime: sessionRuntime, pos: bot.entity.position.floor().toArray().join(', ') }))
		}, 1000)
	})

	bot.once('end', function() {
		sessionTimer = clearInterval(sessionTimer);
		$('#footer-left').text(i18n.t('footer.left.end', { bot: bot, runtime: sessionRuntime }))
		$('#footer-right').text(i18n.t('footer.right.end', { bot: bot, runtime: sessionRuntime }))
		$('#runtime').addClass('flash-red');
	})

	bot.on('title', function(title) {
		term.echo(i18n.t('events.title', { title: title }))
	})

	bot.on('health', function() {
		term.echo(i18n.t('events.health', { health: bot.health, food: bot.food }))
	})

	bot.on('death', function() {
		term.echo(i18n.t('events.death'))
	})

	bot.on('entitySpawn', function(e) {
		if(e.type !== 'player' || e.username === bot.username) return;
		var distance = Math.floor(bot.entity.position.distanceTo(e.position));
		term.echo(i18n.t('events.playerSpawn', { player: e, distance: distance }))
	})

	bot.on('entityGone', function(e) {
		if(e.type !== 'player' || e.username === bot.username) return;
		var distance = Math.floor(bot.entity.position.distanceTo(e.position));
		term.echo(i18n.t('events.playerGone', { player: e, distance: distance }))
	});

	// Chat Listener
	var chatPattern = /^(?:\[?(.*?)?\])?\s?(?:\[?(.*?)?\])?\s?([A-Za-z0-9_][^\s]*)\s?(?:\[?(.*?)?\])?\s?(?::|»|>>) (.*)/ 
    bot.on('messagestr', function(message) {
      if(!chatPattern.test(message)) {
      	term.echo(i18n.t('events.messagestr', { message: message }))
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
    	if(!chatLogger) chatLogger = fs.createWriteStream(`chat-${dateMonthDayYear}.logs`, { flags: 'a' }); // Only open if needed

    	message = message.replaceAll('§', ''); // Remove the Minecraft (Minecraft uses § in the backend) color codes from the message

    	term.echo(i18n.t('events.chat', { bot: bot, group: group, tag: tag, username: username, suffix: suffix, message: message }));
    	chatLogger.write(i18n.t('logger.chat.format', { bot: bot, group: group, tag: tag, username: username, suffix: suffix, message: message }), 'utf-8', {flags: 'a'});
    })

    bot.on('end', function(reason) {
    	if(chatLogger) chatLogger.end();
    	term.echo(i18n.t('events.end', { username: options.username, reason: reason }));
    });

}

function loadAddons() {

}


//startClient({ host: 'localhost', port: 25565, username: 'Pix3lPirat3', version: '1.18.2', auth: 'microsoft' })