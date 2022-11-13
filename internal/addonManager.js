let fs = require('fs');
let glob = require("glob");
let path = require('path');

module.exports = {

  getCommands: function() {

    if(bot) {
      bot.pathfinder?.stop();
      bot.stopDigging();
      bot.clearControlStates();
    }

    Object.values(term_commands).forEach(function(e) {
      if(e.onReload) e.onReload();
    });

    // Default Commands
    // https://github.com/dpup/node-flags || https://github.com/privatenumber/type-flag
    term_commands = {
      connect: {
        cmd: 'connect',
        aliases: ['conn'],
        usage: 'connect <username> <server:port> [version] [offline]',
        description: 'Connect to a server',
        handler: function(sender, args) {
          if (!args || args.length <= 1) return echo('Connect [[;#777777;]\u00bb] \"[[;goldenrod;]connect <username> <server:port> [version&#93;  [offline&#93;]\"\n');
          if(args[3] == true) echo(`[[;#FF5555;]Warning] [[;#777777;]\u00bb] Connecting without authentication..`)
          var host = args[1].split(':');
          var options = {
            username: args[0],
            host: host[0],
            port: host.length ? host[1] : 25565,
            version: args[2] || '1.18.2',
            auth: args[3] == true ? undefined : 'microsoft',
            skipValidation: args[3] == true ? true : false,
            onMsaCode: function(data) {
                echo(`Go to ${data.verification_uri} , enter the code "${data.user_code}"`)
            }
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
          if (!bot?.entity) return echo('Connect [[;#777777;]\u00bb] \"[[;goldenrod;]connect <username> <server:port> [version&#93; [offline&#93;]\"\n');
          return echo('\n[[;#FFA500;]MinePrompt Commands:]\n' + Object.entries(term_commands).map(([a, b]) => `"${b.cmd}" \u00bb "${b.description}"`).join('\n') + '\n');
        }
      }
    }; // Reset the term_commands object, prevent duplicates, and incase command files are removed

    let command_files = this.getFiles('commands');
    command_files.forEach(function(addon) {
      try {
        delete require.cache[require.resolve(addon)];

        let mineprompt_addon = require(addon);
        
        if(mineprompt_addon.addon.useConfig) {
          let fileName = path.basename(addon);
          let filePath = `${__dirname}/../addons/configs/${fileName.replace('js', 'json')}`;
          if(!fs.existsSync(filePath)) fs.writeFileSync(filePath, '{}');
          mineprompt_addon.addon.config = JSON.parse(fs.readFileSync(filePath));
        }

        var cmd = mineprompt_addon.addon.cmd;
        if (term_commands[cmd]) return echo(`[[;#FF5555;]Error] [[;#777777;]\u00bb] There was a repeated command "[[;#FF5555;]${cmd}]" in file "[[;#FF5555;]${addon}]"`);
        term_commands[cmd] = mineprompt_addon.addon;
      } catch (e) {
        echo(`[[;#FF5555;]Error] [[;#777777;]\u00bb] Unable to load the command file "[[;#FF5555;]${addon}]", skipping it.. [[;#FFA500;](Check Console)]`);
        console.log(`\nUnable to load the command file "${addon}", skipping it:\n`, e, '\n');
      }
    });

    console.log(`MinePrompt » Registered [${Object.keys(term_commands).length}] commands..`)

  },

  getListeners: function() {
    // TODO : Implement when needed
  },

  // Get all command files inside /addons/commands/*, recursively to allow sorting commands
  getFiles: function(type) {
    return glob.sync(`./addons/commands/**/*.js`, { realpath: true, absolute: true });
  }

}