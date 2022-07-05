var utils = require('../utils.js');

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'eat',
    aliases: ['consume'],
    usage: 'eat [item]',
    description: 'Eat an item in the player\'s inventory.',
    handler: handler
  };


  async function handler(sender, args) {
  	if(args.length === 0) {
  		utils.eat()
  	}
  }

  return addon;

}
