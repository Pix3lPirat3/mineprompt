module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'reconnect',
    aliases: ['reboot'],
    usage: 'reconnect',
    description: 'Reconnect to the last server',
    handler: handler
  };


  async function handler(sender, args) {
  	bot.end()
  	var options = bot.lastOptions;

  	term.echo(`Reconnecting to [[;#FF5555;]"${options.host}:${options.port}"] as [[;#FF5555;]"${options.username}"] (Version: [[;#FF5555;]"${options.version}"])`)


  	startClient(bot.lastOptions)
  }

  return addon;

}
