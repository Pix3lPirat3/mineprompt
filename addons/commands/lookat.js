module.exports = {
  addon: {
    cmd: 'lookat',
    autocomplete: ['players', 'args'],
    args: ['north', 'east', 'south', 'west'],
    usage: 'lookat <player/north/east/south/west> [force]',
    description: 'Look at a player or direction',
    useConfig: true,
    handler: async function(sender, args) {
      let lang = this.config.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      if (args.length === 0) return echo(lang.no_argument);

      if(args[0] === 'nearest') {
        let target = bot.nearestEntity(e => e.type === 'player');
        if (!target) return echo(lang.no_target_found.replace('{target}', args[0]));
        await bot.lookAt(target.position, args[1]);
        return echo(lang.started.replace('{target}', args[0]));
      }

      if (target = Object.values(bot.players).filter(e => e.username === args[0])[0]?.entity) {
        if (!target) return echo(lang.no_target_found.replace('{target}', args[0]));
        await bot.lookAt(target.position, args[1]);
        return echo(lang.started.replace('{target}', args[0]));
      }

      return echo(lang.no_target_found.replace('{target}', args));

    }
  }
};