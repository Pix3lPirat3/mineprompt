var fs = require('fs');

module.exports = {

  getCommands: function() {

    // Default Commands
    term_commands = {
      connect: {
        cmd: 'connect',
        aliases: ['conn'],
        usage: 'connect <username> <server:port> [version]',
        description: 'Connect to a server',
        handler: function(sender, args) {
          if (!args || args.length <= 1) return echo('Connect to a server using \"[[;goldenrod;]connect <username> <server:port> [version&#93;]\"\n');
          var host = args[1].split(':');
          var options = {
            username: args[0],
            host: host[0],
            port: host.length ? host[1] : 25565,
            version: args[2] || '1.18.2',
            auth: 'microsoft'
          };
          startClient(options);
          return;
        }
      },
      reload: {
        cmd: 'reload',
        description: 'Reload the command system',
        handler: function(sender, args) {
          echo(`\n[[;#FFA500;]Reload] [[;#777777;]\u00bb] Reloading the command manager..`);
          echo(`[[;#FFA500;]Warning] [[;#777777;]\u00bb] This may cause issues with event listeners.. ([[!;;;;https://github.com/Pix3lPirat3/mineprompt#reload-warning]Wiki])\n`);
          return commander.getCommands();
        }
      },
      help: {
        cmd: 'help',
        description: 'Display the help menu',
        handler: function() {
          if (!bot?.entity) return echo('Connect to a server using \"[[;goldenrod;]connect <username> <server:port> [version&#93;]\"\n');
          return echo('\n[[;#FFA500;]MinePrompt Commands:]\n' + Object.entries(term_commands).map(([a, b]) => `"${b.cmd}" \u00bb "${b.description}"`).join('\n') + '\n');
        }
      }
    }; // Reset the term_commands object, prevent duplicates, and incase command files are removed

    let command_files = this.getFiles('commands');
    command_files.forEach(function(addon) {
      try {

        // Removes the cache'd file, so it can be required again
        delete require.cache[require.resolve(`${__dirname}/../addons/commands/${addon}`)];

        let mineprompt_addon = require(`${__dirname}/../addons/commands/${addon}`);

        if(mineprompt_addon.addon.useLanguage) {
          mineprompt_addon.addon.lang = JSON.parse(fs.readFileSync(`${__dirname}/../addons/language/${settings.language_code}/${addon.replace('js', 'json')}`)); // fs.getFileSync // getLanguage(settings.language_code); 
        }

        var cmd = mineprompt_addon.addon.cmd;
        if (term_commands[cmd]) return echo(`[[;#FF5555;]Error] [[;#777777;]\u00bb] There was a repeated command "[[;#FF5555;]${cmd}]" in file "[[;#FF5555;]${addon}]"`);
        term_commands[cmd] = mineprompt_addon.addon;
      } catch (e) {
        echo(`[[;#FF5555;]Error] [[;#777777;]\u00bb] Unable to load the command file "[[;#FF5555;]${addon}]", skipping it.. [[;#FFA500;](Check Console)]`);
        console.log(`Unable to load the command file "${addon}", skipping it:\n`, e);
      }
    });

  },

  getListeners: function() {
    // TODO : Implement when needed
  },

  getFiles: function(type) {
    let dir = `${__dirname}/../addons/${type}`;
    let files = fs.readdirSync(`${__dirname}/../addons/${type}`).filter(file => file.endsWith('.js'));
    return files;
  }

}