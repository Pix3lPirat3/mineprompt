module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'connect',
    aliases: ['join'],
    usage: 'connect <username> <host> <version>',
    description: 'Connect to a server',
    handler: handler
  };


  async function handler(sender, args) {
  	if(args.length === 0) return term.echo(`[[;#FF5555;]Usage: "${addon.usage}"]`).id();

    var options = {
      username: args[0],
      host: args[1],
      port: 25565,
      version: args[2] || '1.18.2',
      auth: 'microsoft'
    }

  	startClient(options)
  }

  return addon;

}
