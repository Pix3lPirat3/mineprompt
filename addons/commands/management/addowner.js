module.exports = {
  addon: {
    cmd: 'addowner',
    autocomplete: ['players'],
    usage: 'addowner <player>',
    description: 'Add a master to the bot',
    handler: async function(sender, args) {
      let masters = bot.mineprompt.masters;
      let username = args[0];
      if(masters.includes(username)) return echo(`[[;indianred;]Error:] [[;goldenrod;]${username}] is already a master!`);
      bot.mineprompt.masters.push(username);
      return echo(`[[;goldenrod;]Masters:] ` + bot.mineprompt.masters.join(', '));
    }
  }
};