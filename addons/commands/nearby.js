function handler(sender, args) {
  if(!bot?.entity) return echo(`There is no bot entity to look around..`);
  var players = Object.entries(bot.entities).filter(([a, b]) => b.type === 'player' && b.username !== bot.username);
  var distanceMap = players.map(([a, b]) => `${b.username} (${Math.floor(bot.entity.position.distanceTo(b.position))}m)`);
  if(!distanceMap.length) return echo(`[Nearby] There are no nearby players..`)
  echo(`[Nearby] Nearby Players: ${distanceMap.join(', ')}`)
}

module.exports = {
  addon: {
    cmd: 'nearby',
    aliases: ['near'],
    usage: 'nearby',
    description: 'Show nearby players.',
    handler: handler
  }
};