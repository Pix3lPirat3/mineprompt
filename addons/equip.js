module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'equip',
    aliases: ['eq'],
    usage: 'equip <item>',
    description: 'Equip an item',
    handler: handler
  };


  async function handler(sender, args) {
    // Should we sort by `i.name ===` then `i.name.startsWith()` then `i.name.includes()``
    if (args.length === 0) return term.echo(`[[;#FF5555;]You must specify an item to equip.]`).id();
    var item = bot.inventory.items().filter(i => i.name.includes(args[0]))[0];
    if (!item) return term.echo(`[[;#AAAAAA;]Unknown item] "[[;#FF5555;]${args[0]}][[;#AAAAAA;]", check your inventory.]`).id();
    if (args.length === 1) {
      bot.equip(item, 'hand');
      return term.echo(`[[;#AAAAAA;]Equipped] "[[;#FF5555;]${item.name}][[;#AAAAAA;]", to your hand.]`).id();
    }
    if (args.length === 2) {
      // equip <item> <slot>
      var slots = ["hand", "head", "torso", "legs", "feet", "off-hand"];
      if (!slots.includes(args[1].toLowerCase())) return term.echo(`[[;#AAAAAA;]Invalid slot] "[[;#FF5555;]${args[1]}][[;#AAAAAA;]", (Slots: ${slots.join(', ')}).]`).id();
      bot.equip(item, args[1])
      return term.echo(`[[;#AAAAAA;]Equipped] "[[;#FF5555;]${item.name}][[;#AAAAAA;]", to your ]"[[;#FF5555;]${args[1]}][[;#AAAAAA;]"`).id();
    }

  }

  return addon;

}