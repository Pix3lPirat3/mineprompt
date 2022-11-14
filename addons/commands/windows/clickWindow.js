module.exports = {
  addon: {
    cmd: 'clickwindow',
    aliases: ['cw'],
    usage: 'clickwindow <slot | item> <click: left/right>', // TODO : Integrate just "Slot #"
    description: 'Click a specific slot/item in a window.',
    handler: async function(sender, args) {
      if (!bot?.entity) return echo('There is no bot entity..');
      if (!args[0]) return echo('You must specify a slot or item to click..');

      if (!bot.currentWindow) return echo('There is no window currently opened..');

      let slot = args[0];
      if (!isNaN(slot)) {
        slot = +slot; // Convert String to Number
        echo(`Clicking on slot #${slot}`)
      } else {
      	echo(`Trying to find item ${slot}`)
      	let item = bot.currentWindow.slots.find(i => i?.name.includes(args[0]))
      	if(!item) return echo(`Unable to find an item with the name ${args[0]}`)
      	slot = item.slot;
      }

      let type = args[1] || 'left';
      if (type !== 'left' && type !== 'right') return echo(`You must specify a click type. "${this.addon.usage}"`)

      if (type === 'left') bot.simpleClick.leftMouse(slot);
      if (type === 'right') bot.simpleClick.rightMouse(slot)

      function isNumeric(str) {
        if (typeof str != "string") return false
        return !isNaN(str) && !isNaN(parseFloat(str));
      }
    }
  }
};