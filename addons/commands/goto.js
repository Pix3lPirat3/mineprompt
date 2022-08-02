module.exports = {
  addon: {
    cmd: 'goto',
    autocomplete: ['players', 'args'],
    args: ['nearest', 'stop'],
    usage: 'goto <player> <range>',
    description: 'Go to a player or coordinates.',
    useLanguageFile: true,
    handler: async function(sender, args) {
      let lang = this.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      if(args.length === 0) return echo(lang.no_argument);

      if(args[0] === 'stop') return bot.pathfinder.stop(), echo(lang.stopped);

      if(args[0] === 'nearest') {
          let target = bot.nearestEntity(e => e.type === 'player');
          if(!target) return echo(lang.no_target_found.replace('{target}', args[0]));
          let { x, y, z } =  target.position;
          echo(lang.started.replace('{target}', Object.values(target.position).map(i => Math.floor(i)).join(', ')))
          try {
              await bot.pathfinder.goto(new GoalNear(x, y, z, args[1] || 2));
              return echo(lang.arrived.replace('{target}', Object.values(target.position).map(i => Math.floor(i)).join(', ')))
          } catch(e) {
              return echo(lang.failed.replace('{target}', Object.values(target.position).map(i => Math.floor(i)).join(', ')))
          }
      }

      if(isPlayer = Object.values(bot.players).filter(e => e.username === args[0])[0]) {
          let target = args[0] === 'nearest' ? bot.nearestEntity(e => e.type === 'player') : isPlayer.entity;
          if(!target) return echo(lang.no_target_found.replace('{target}', args[0]));
          let { x, y, z } =  target.position;
          echo(lang.started.replace('{target}', Object.values(target.position).map(i => Math.floor(i)).join(', ')))
          try {
              await bot.pathfinder.goto(new GoalNear(x, y, z, args[1] || 2));
              return echo(lang.arrived.replace('{target}', Object.values(target.position).map(i => Math.floor(i)).join(', ')))
          } catch(e) {
              return echo(lang.failed.replace('{target}', Object.values(target.position).map(i => Math.floor(i)).join(', ')))
          }
      }

      if(args.length === 2) {
          let pos = { x: args[0], z: args[1] };
          echo(lang.started.replace('{target}', Object.values(pos).map(i => Math.floor(i)).join(', ')))
          try {
              await bot.pathfinder.goto(new GoalNearXZ(pos.x, pos.z, args[2] || 2));
              return echo(lang.arrived.replace('{target}', Object.values(pos).map(i => Math.floor(i)).join(', ')))
          } catch(e) {
              return echo(lang.failed.replace('{target}', Object.values(pos).map(i => Math.floor(i)).join(', ')))
          }
      }
      
      if(args.length === 3) {
          let pos = { x: args[0], y: args[1], z: args[2] };
          echo(lang.started.replace('{target}', Object.values(pos).map(i => Math.floor(i)).join(', ')))
          try {
              await bot.pathfinder.goto(new GoalNear(pos.x, pos.y, pos.z, args[3] || 2));
              return echo(lang.arrived.replace('{target}', Object.values(pos).map(i => Math.floor(i)).join(', ')))
          } catch(e) {
              return echo(lang.failed.replace('{target}', Object.values(pos).map(i => Math.floor(i)).join(', ')))
          }
      }

      return echo(lang.no_target_found.replace('{target}', args));
      
    }
  }
};