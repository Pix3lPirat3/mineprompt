module.exports = {
  addon: {
    cmd: 'players',
    usage: 'players',
    description: 'Show online players.',
    useConfig: true,
    handler: async function(sender, args) {
      let lang = this.config.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      let map = Object.keys(bot.players).map(e => e.replace('{name}', e.username));
      echo(lang.player_msg.replace('{map}', map.join(', ')));
    }
  }
};