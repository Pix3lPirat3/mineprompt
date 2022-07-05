module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'lookat',
    aliases: ['look'],
    usage: 'lookat <player|entity>',
    
    description: 'Look at a position, direction, or at an entity',
    handler: handler
  };

  async function handler(sender, args) {
  	var target = bot.players[args[0]]?.entity;
  	if(!target) return console.log(`I cannot see the player "${args[0]}"`)
    console.log(`[Look] Looking at ${target.username}`)
    bot.lookAt(target.position)
  }

  return addon;

}