const { GoalNear } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  // TODO : Clean up this addon..

  var addon = {
    type: 'command',
    cmd: 'circle',
    aliases: ['bee'],
    usage: 'circle <player>',
    args: ['stop'],
    description: 'Go in circles around a spot or player',
    handler: handler
  };

  var stop = false;

  async function handler(sender, args) {
    if(args.length === 0) {
      circle(50, bot.entity.position)
      term.echo(i18n.t('addons.circle.enabled'));
    }
    if(args.length === 1) {
      if(args[0] === 'stop') {
        bot.pathfinder.stop();
        term.echo(i18n.t('addons.circle.disabled'));
        return stop = true;
      }

      var target = bot.players[args[0]]?.entity;
      if(!target) return term.echo(i18n.t('addons.circle.failed', { target: args[0] })).id()
      circle(50, target.position)
    }

  }

  async function circle(times, position) {
    for (let i = 0; i <= times; i++) {
      if(stop) return stop = false;
      //const { position } = bot.entity
      var pos = position.offset(Math.sin(i) * 2, 0.5, Math.cos(i) * 2)
      await bot.pathfinder.goto(new GoalNear(pos.x, pos.y, pos.z, 1));
    }
  }

  return addon;

}
