module.exports = {
  addon: {
    cmd: 'nearby',
    aliases: ['near'],
    args: ['players', 'mobs'],
    autocomplete: ['args'],
    usage: 'nearby',
    description: 'Show nearby players or mobs.',
    useLanguage: true,
    handler: function(sender, args) {
      //let lang = this.lang;
      if (!bot?.entity) return echo(this.lang.no_bot);
      let type = args[0]?.toLowerCase() || 'players';

      if(!this.args.includes(type)) return echo(this.lang.unknown_target.replace('{target}', type));

      let distanceMap = getNearby(type);
      if (!distanceMap.length) return echo(lang.no_entities_nearby.replaceAll('{type}', type));
      
      echo(lang.distance_msg.replace('{type}', type).replace('{map}', distanceMap.join(', ')));

      function getNearby(type) {
        let map = [];
        let mapMsg = null;
        switch(type) {
          case 'mobs':
            map = Object.values(bot.entities).filter(e => e.type === 'mob');
            mapMsg = map.map(e => lang.distance_map.replaceAll('{name}', e.mobType).replaceAll('{distance}', Math.floor(bot.entity.position.distanceTo(e.position))));
            break;
          case 'players':
          default:
            map = Object.values(bot.entities).filter(e => e.type === 'player' && e.username !== bot.username);
            mapMsg = map.map(e => lang.distance_map.replaceAll('{name}', e.username).replaceAll('{distance}', Math.floor(bot.entity.position.distanceTo(e.position))));
            break;
        }

        map = map.reverse();
        return mapMsg;

      }
    }
  }
};