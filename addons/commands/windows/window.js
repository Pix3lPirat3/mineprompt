module.exports = {
  addon: {
    cmd: 'window',
    usage: 'window',
    description: 'Prints the current window',
    handler: async function(sender, args) {
      if (!bot?.entity) return echo('There is no bot entity..');
      if(!bot.currentWindow) return echo('There is no window currently opened..');
      for (const [slot, item] of Object.entries(bot.currentWindow.slots)) {
        if(item === null) continue;
        echo(`[${slot}] ${item.name} - ${item.displayName}`); // TODO : Add customName - but stripped of JSON and Colors
      }
    }
  }
};