module.exports = {
  addon: {
    cmd: 'activateItem',
    usage: 'activateItem <offhand=false>',
    description: 'Activate an item in your inventory.',
    handler: async function(sender, args) {
      if (!bot?.entity) return echo('There is no bot entity..');
      var offhand = (args[0] === 'true');
      let withOrWithout = offhand ? 'with' : 'without'
      echo(`Activating item ${bot.heldItem.name} ${withOrWithout} offhand`)
      bot.activateItem(offhand)
    }
  }
};