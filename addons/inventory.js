module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'inventory',
    aliases: ['inv'],
    usage: 'inventory',
    
    description: 'Used to display the player\'s inventory',
    handler: handler
  };

  async function handler(sender, args) {

    var items = args[0] ? bot.inventory.items().filter(i => i.name === args[0]) : bot.inventory.items();

    echo(`Inventory: [${items.length} Items]`)

    echo(items.map(function(i) {
      var msg = `[${i.slot}] ${i.count}x ${i.displayName} (${i.name})`;
      if (isTool(i)) {
        let durabilityMax = bot.registry.itemsByName[i.name].maxDurability
        let durabilityUsed = i.nbt.value.Damage.value;
        var durabilityLeft = durabilityMax - durabilityUsed;
        msg += ` [Durability: ${durabilityLeft} / ${durabilityMax}]`
      }
      return msg;
    }).join(',\n'))

  }

  function isTool(item) {
    if (item.name.includes('sword')) return true
    if (item.name.includes('pickaxe')) return true
    if (item.name.includes('shovel')) return true
    if (item.name.includes('axe')) return true
    if (item.name.includes('hoe')) return true
    return false
  }

  return addon;

}