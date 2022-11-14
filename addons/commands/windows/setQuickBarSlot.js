module.exports = {
  addon: {
    cmd: 'setquickbar',
    aliases: ['setquick', 'setslot', 'quickbar'],
    description: 'Sets your quick bar to a specific slot',
    handler: async function(sender, args) {
      if (!bot?.entity) return echo('There is no bot entity..');
      bot.setQuickBarSlot(args[0])
      let heldItem = bot.heldItem?.name || 'nothing'; 
      echo(`Now holding ${heldItem}`)
    }
  }
};