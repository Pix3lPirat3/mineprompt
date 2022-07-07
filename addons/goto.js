const { GoalNear, GoalBlock } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'goto',
    aliases: ['navto'],
    usage: 'goto <player>',
    description: 'Drop an item',
    handler: handler
  };


  async function handler(sender, args) {
    // Should we sort by `i.name ===` then `i.name.startsWith()` then `i.name.includes()``
    if (args.length === 0) return echo(`[[;#FF5555;]You must specify a player to goto.]`);
    
    var target = bot.players[args[0]]?.entity;
    if(!target) return echo(`I cannot see a player named [[;#FF5555;]"${args[0]}"]`);

    var pos = target.position;
    try {
      await bot.pathfinder.goto(new GoalBlock(pos.x, pos.y, pos.z));
      await bot.look(target.yaw, target.pitch, false);
      echo(`I have made it to [[;#FF5555;]"${args[0]}"]`)
    } catch (e) {
      console.log(`[[;#FF5555;]There was an issue completing my path..]`);
    }

  }

  return addon;

}