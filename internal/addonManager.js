var fs = require('fs');

var command_files = fs.readdirSync(`${__dirname}/../addons`).filter(file => file.endsWith('.js'));

//console.log('command_files:', command_files)

module.exports = function(bot) {

  bot.commander = {
    options: {
      prefix: '!'
    },
    masters: ['Pix3lSlime'], // Used to set who can use commands, default is EVERYONE
    commands: []
  }

  bot.commander.load = function(files) {
    if (!files || files === 'all') {

      for (var a = 0; a < command_files.length; a++) {
      	//console.log(`Grabbing: ${__dirname}/../addons/${command_files[a]}`)
        var cmd = require(`${__dirname}/../addons/${command_files[a]}`)(bot);
        if(cmd.type !== 'command') {
        	term.echo(`The file '${command_files[a]}' is not a command, ignoring.`).id();
        	continue;
        }
        term_commands[cmd.cmd] = cmd;
        bot.commander.commands.push(cmd);
        term.echo(i18n.t('misc.addonManager.loaded', { cmd: cmd }));
      }

    }
  }

}