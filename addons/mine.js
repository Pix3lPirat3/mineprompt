var utils = require('../utils.js')

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'mine',
    aliases: ['break'],
    usage: 'mine',
    
    description: 'Mines the block in front of the player',
    handler: handler
  };

  var running = false;
  var shouldStop = false;

  async function handler(sender, args) {
  	if(running) {
  		shouldStop = true;
  	}
  	running = true;

    async function dig() {
   		if(shouldStop) {
   			running = false;
   			shouldStop = false;
   			return;
   		}
      var pickaxes = bot.inventory.items().filter(i => i.name.includes('pickaxe') && getRemainingDurability(i) > 10);



      // Eat
      await utils.eat()

      // End Eat

      if (bot.food < 2) process.exit(); // I don't want the bot to starve to death..
      if (!pickaxes.length) return utils.notify('Miner Task', 'I have 0 viable pickaxes left.')

      if(!pickaxes.includes(bot.heldItem)) await bot.equip(pickaxes[0])

      var block = bot.blockAtCursor(4);
      if (!block) return setTimeout(function() {
        dig();
      }, 100);
      await bot.dig(block, 'ignore', 'raycast') // 2nd param: true to 'snap at block' or 'ignore' to just not turn head
      dig()
    }

    dig()
  }

function getRemainingDurability(item) {
    if (!item) return 0;
    let durabilityMax = bot.registry.itemsByName[item.name].maxDurability
    let durabilityUsed = item.nbt.value.Damage.value;
    var durabilityLeft = durabilityMax - durabilityUsed;
    return durabilityLeft;
  }

  return addon;

}