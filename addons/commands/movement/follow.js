module.exports = {
  addon: {
    cmd: 'follow',
    args: ['nearest', 'stop'],
    autocomplete: ['players', 'args'],
    usage: 'follow <player | nearest>',
    description: 'Follow a target player.',
    useConfig: true,
    handler: async function(sender, args) {
      let lang = this.config.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      
      if(sender !== 'CONSOLE' && args.length === 0) {
        // Follow player who ran the command

        let entity = bot.players[sender]?.entity;
        
        if(!entity) return bot.chat(`/msg ${sender} I cannot see you!`);

        bot.chat(`/msg ${sender} I will now start following you..`);
        echo(`[Follow] Now following ${entity.username}`)

        return bot.pathfinder.setGoal(new GoalFollow(entity, 2), true);
      }

      if(!args[0]) return echo(lang.no_argument);
      
      let target = args[0].toLowerCase();
      let entity = null;

      if(target === 'stop') return bot.pathfinder.stop(), echo(lang.stopped);
      if(target === 'nearest') {
        entity = bot.nearestEntity(e => e.type === 'player');
        if(!entity) return echo(lang.no_target_found.replace('{type}', entity));
        bot.pathfinder.setGoal(new GoalFollow(entity, 2), true);
        return echo(lang.started.replace('{target}', entity.username));
      }

      if (target = Object.values(bot.players).filter(e => e.username === args[0])[0]?.entity) {
       if (!target) return echo(lang.no_target_found.replace('{target}', args[0]));
       bot.pathfinder.setGoal(new GoalFollow(target, 2), true);
       return echo(lang.started.replace('{target}', args[0]));
      }

      if(!entity) return echo(lang.no_target_found.replace('{type}', target));

      echo(lang.started.replace('{target}', entity.username));
      
    }
  }
};