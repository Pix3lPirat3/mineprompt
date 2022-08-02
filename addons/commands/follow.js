module.exports = {
  addon: {
    cmd: 'follow',
    args: ['nearest', 'stop'],
    autocomplete: ['players', 'args'],
    usage: 'follow <player | nearest>',
    description: 'Follow a target player.',
    useLanguageFile: true,
    handler: async function(sender, args) {
      let lang = this.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      if(!args[0]) return echo(lang.no_argument);

      let target = args[0].toLowerCase();
      let entity = null;
      if(target === 'stop') return bot.pathfinder.stop(), echo(lang.stopped);
      if(target === 'nearest') entity = bot.nearestEntity(e => e.type === 'player');
      if(!entity) entity = Object.values(bot.players).filter(e => e.username.toLowerCase() === target)[0]?.entity;
      if(!entity) return echo(lang.no_target_found.replace('{type}', target));

      bot.pathfinder.setGoal(new GoalFollow(entity, 2), true);

      echo(lang.started.replace('{target}', entity.username));
      
    }
  }
};