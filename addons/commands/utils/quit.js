module.exports = {
  addon: {
    cmd: 'quit',
    aliases: ['exit'],
    usage: 'quit',
    description: 'Ends the session of the bot.',
    useConfig: false,
    handler: async function(sender, args) {
      if (!bot?.entity) return echo('There is no session to end..');
      echo(`I will now gracefully exit the server..`)
      bot.quit('Quit Gracefully');
    }
  }
};
