module.exports = {
  addon: {
    cmd: 'removeowner',
    autocomplete: ['players'],
    usage: 'removeowner <player>',
    description: 'Remove a master from the bot',
    handler: async function(sender, args) {
      let masters = bot.mineprompt.masters;
      let username = args[0];
      if(!masters.includes(username)) return echo(`[[;indianred;]Error:] [[;goldenrod;]${username}] is not a master!`);
      masters.splice(masters.indexOf(username), 1);
      return echo(`[[;indianred;]Removed] [[;goldenrod;]${username}] [[;indianred;]from the list of masters]`);
      return echo(`[[;goldenrod;]Masters:] ` + bot.mineprompt.masters.join(', '));
    }
  }
};