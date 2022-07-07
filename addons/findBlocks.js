var utils = require('../utils.js');

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'findblocks',
    usage: 'findBlocks [item]',
    description: 'Show the result of findBlocks (for development purposes)',
    handler: handler
  };


  async function handler(sender, args) {
      if(args.length === 0) {
          echo('You must pass an argument..');
      }
      var name = args[0];
      var matching = bot.registry.blocksByName[name];
      if(!matching) return echo(`No such block called ${args[0]}`);
      var blocks = await bot.findBlocks({
          matching: matching.id,
          maxDistance: 32,
          count: 64
      })
      if(!blocks) return echo(`There are no nearby blocks called ${args[0]}`);

      var positionArrays = blocks.join(', ');
      echo(positionArrays)
      console.log(positionArrays);

      for(var a = 0; a < blocks.length; a++) {
          console.log(bot.blockAt(blocks[a], true))
      }


  }

  return addon;

}
