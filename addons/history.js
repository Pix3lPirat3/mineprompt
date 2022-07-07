const request = require('request');

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'history',
    usage: 'history <player>',
    description: 'Gets the username history of a player',
    handler: handler
  };


  async function handler(sender, args) {
    var target = args[0];
    if (!target) return echo('You must specify a user.');

    var url = `https://api.ashcon.app/mojang/v2/user/${target}`;

    request(url, {
      json: true
    }, (error, res, body) => {
      if (error) return echo(error)
      if (res.statusCode == 200) {
        var body = res.body;
        echo('\nGrabbing the user\'s history.. this may take a second..');
        echo(`UUID: ${body.uuid}\n` + body.username_history.map(o => `${o.username} (${moment.preciseDiff(o.changed_at, Date.now()) || 'UNKNOWN TIME'} ago)`).join('\n') + '\n')
      };
    });


  }

  return addon;

}