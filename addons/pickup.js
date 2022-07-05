module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'pickup',
    aliases: ['grab'],
    usage: 'pickup <item>',
    
    args: ['commit', 'push', 'pull'],
    options: ['amend', 'hard', 'version', 'help'],
    
    description: 'Collect dropped items',
    handler: handler
  };

  async function handler(sender, args) {
    console.log('RAN THE PICKUP COMMAND')

  	var target = bot.players[args[0]]?.entity;
  	if(!target) return console.log(`I cannot see the player "${args[0]}"`)
    console.log(`[Look] Looking at ${target.username}`)
    bot.lookAt(target.position)
  }

  return addon;

}