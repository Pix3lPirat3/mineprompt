const { GoalNear, GoalBlock } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'cmd',
    aliases: ['command'],
    usage: 'cmd <command>',
    description: 'Send a command',
    handler: handler
  };


  async function handler(sender, args) {
    var command = args.join(' ');
    if(command.trim().length === 0) return term.echo(i18n.t('addons.cmd.failed')).id();
    console.log(term.echo(i18n.t('addons.cmd.sent', { command: command })));
    bot.chat(`/${command}`)
  }

  return addon;

}