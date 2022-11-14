let fs = require('fs');
let glob = require("glob");
let path = require('path');
const parseSentence = require('minimist-string');

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
    term_commands = {
      connect: {
        cmd: 'connect',
        aliases: ['conn'],
        usage: 'connect -u [username] -h <host> -p [port] -v <version> -auth [true\\false]',
        description: 'Connect to a server',
        handler: function(sender, args) {

          let opts = parseSentence(args.join(' '));

          // NOTE : When using shorthand (-host) only one `-` is needed, when using longhand (--host) two are needed.
          let username = opts.u || opts.username;
          if(!username) username = 'Anonymous' + generateNumber(7), opts.v, opts.auth = false; // If no username is specified - use Anyonymous and disable authentication
          let host = opts.h || opts.host;
          if(!host) return echo('You must specify a host with -h or --host')
          let port = opts.p || opts.port;
          if(!port) echo('You can specify a port with -p or --port')
          let version = opts.v || opts.version;
          if(!version) return echo('You must specify a version with -v or --version')
          let authentication = opts.a || opts.auth; // (Default: true)
          if(!authentication) echo('You can specify authentication with -a or --auth (-a=true/false)')
          // Converting the "String" passed from the input to a Boolean (There must be a better way..)
          if(authentication === 'false' || authentication === '0') authentication = false; // Convert to Boolean
          if(authentication === 'true' || authentication === '1' || authentication == undefined) authentication = true; // Convert to Boolean

          let options = {
            username: username,
            host: host,
            port: port,
            version: version,
            auth: authentication ? 'microsoft' : undefined,
            skipValidation: !authentication,
            onMsaCode: function(data) {
                echo(`Use the code "${data.user_code}" on ${data.verification_uri} to authenticate your account.`)
                echo(`If you don't want to authenticate then add '-a false' (or --auth false)`)
            }
          }

          startClient(options);

          // Generates a number (l being length of digits)
          function generateNumber(length) {
              var add = 1, max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
              if (length > max) return generate(max) + generate(length - max);
              max = Math.pow(10, length + add);
              var min = max / 10; // Math.pow(10, length) basically
              var number = Math.floor(Math.random() * (max - min + 1)) + min;
              return ("" + number).substring(add);
          }
        }
      },
      reload: {
        cmd: 'reload',
        description: 'Reload the command system',
        handler: function(sender, args) {
          echo(`\n[[;#FFA500;]Reload] [[;#777777;]\u00bb] Reloading the command manager..`);
          echo(`[[;#FFA500;]Warning] [[;#777777;]\u00bb] This causes issues with events, timers, and more.. ([[!;;;;https://github.com/Pix3lPirat3/mineprompt#reload-warning]Wiki])\n`);
          return commander.getCommands();
        }
      },
      help: {
        cmd: 'help',
        description: 'Display the help menu',
        handler: function() {
          if (!bot?.entity) return echo(term_commands.connect.usage);
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