module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'players',
    aliases: ['online'],
    usage: 'players',
    description: 'Shows who\'s online.',
    handler: handler
  };


  async function handler(sender, args) {
  	echo(`Online Players: ${Object.keys(bot.players).join(', ')}`)
  }

  return addon;

}
