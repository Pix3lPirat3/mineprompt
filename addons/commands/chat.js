module.exports = {
  addon: {
    cmd: 'chat',
    aliases: ['say'],
    autocomplete: ['players'],
    usage: 'chat <message>',
    description: 'Send a message.',
    useConfig: true,
    handler: async function(sender, args) {
      let lang = this.config.lang;
      let settings = this.config.settings;
      if (!bot?.entity) return echo(lang.no_bot);
      var message = args.join(' ');
      if(settings.print) {
        echo(lang.command_sent.replace('{msg}', message))
      }
      bot.chat(message);
    }
  }
};
