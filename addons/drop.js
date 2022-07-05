module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'drop',
    aliases: ['toss'],
    usage: 'drop <item>',
    description: 'Drop an item',
    handler: handler
  };


  async function handler(sender, args) {
    // Should we sort by `i.name ===` then `i.name.startsWith()` then `i.name.includes()``
    if (args.length === 0) return term.echo(`[[;#FF5555;]You must specify an item to drop.]`).id();
    
    var item = bot.inventory.items().filter(i => i.name.includes(args[0]))[0];
    if (!item) return term.echo(`Unknown item "[[;#FF5555;]${args[0]}]", check your inventory.`).id();
    
    if (args.length === 1) {
    	console.log(item)
      bot.toss(item.type, null, item.count);
      return term.echo(`Dropping "[[;#FF5555;]${item.count}x ${item.name}]".`).id();
    }

  }

  return addon;

}