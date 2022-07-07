const { GoalNear, GoalBlock } = require('mineflayer-pathfinder').goals

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'say',
    aliases: ['chat'],
    usage: 'say <message>',
    description: 'Send a message',
    handler: handler
  };


  async function handler(sender, args) {
    var message = args.join(' ');
    if(message.trim().length === 0) return echo(`You must input a message to send..`);
    console.log(`Sending the message "${message}"`)
    bot.chat(message)
  }

  return addon;

}