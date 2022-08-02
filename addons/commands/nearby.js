module.exports = {
  addon: {
    cmd: 'nearby',
    aliases: ['near'],
    args: ['players', 'mobs'],
    autocomplete: ['args'],
    usage: 'nearby',
    description: 'Show nearby players or mobs.',
    useLanguageFile: true,
    handler: function(sender, args) {
      let lang = this.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      let type = args[0]?.toLowerCase() || 'players';

      if(!this.args.includes(type)) return echo(lang.unknown_target.replace('{target}', type));

      let distanceMap = getNearby(type);
      if (!distanceMap.length) return echo(lang.no_entities_nearby.replaceAll('{type}', type));
      
      echo(lang.distance_msg.replace('{type}', type).replace('{map}', distanceMap.join(', ')));

      function getNearby(type) {
        let map = [];
        let mapMsg = null;
        switch(type) {
          case 'mobs':
            map = Object.values(bot.entities).filter(e => e.type === 'mob');
            break;
          case 'players':
          default:
            map = Object.values(bot.entities).filter(e => e.type === 'player' && e.username !== bot.username);
            break;
        }
        map = map.sort((a, b) => bot.entity.position.distanceTo(a.position) - bot.entity.position.distanceTo(b.position));
        return map.map(e => lang.distance_map.replaceAll('{name}', e.username || e.mobType).replaceAll('{distance}', Math.floor(bot.entity.position.distanceTo(e.position))));
      }
    }
  }
};