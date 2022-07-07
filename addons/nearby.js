module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'nearby',
    aliases: ['near'],
    usage: 'nearby',
    description: 'Show nearby players.',
    handler: handler
  };


  async function handler(sender, args) {
  	var players = Object.entries(bot.entities).filter(([a, b]) => b.type === 'player' && b.username !== bot.username);
  	var distanceMap = players.map(([a, b]) => `${b.username} (${Math.floor(bot.entity.position.distanceTo(b.position))}m)`);
  	echo(`Nearby Players: ${distanceMap.join(', ')}`)
  }

  return addon;

}
