module.exports = {
  addon: {
    cmd: 'chat',
    aliases: ['say'],
    autocomplete: ['players'],
    usage: 'chat <message>',
    description: 'Send a message.',
    useLanguage: true,
    handler: async function(sender, args) {
      let lang = this.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      var message = args.join(' ');
      echo(lang.command_sent.replace('{msg}', message))
      bot.chat(message);
    }
  }
};
