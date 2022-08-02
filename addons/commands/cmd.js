module.exports = {
  addon: {
    cmd: 'cmd',
    aliases: ['command'],
    autocomplete: ['players'],
    usage: 'cmd <command>',
    description: 'Run a command.',
    useLanguageFile: true,
    handler: async function(sender, args) {
      let lang = this.lang;
      if (!bot?.entity) return echo(lang.no_bot);
      var command = args.join(' ');
      echo(lang.command_sent.replace('{cmd}', command))
      bot.chat('/' + command);
    }
  }
};
