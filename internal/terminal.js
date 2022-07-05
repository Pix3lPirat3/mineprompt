var appVersion = require('../package.json').version;

var ul;
var term_commands = {};

var term = $('#terminal').terminal(function(input) {
  var command = $.terminal.parse_command(input);
  var cmd = command.name;
  var args = command.args;

  if (cmd === 'connect') {
    var options = {
      username: args[0],
      host: args[1],
      port: 25565,
      version: args[2] || '1.18.2',
      auth: 'microsoft'
    }
    startClient(options)
    return;
  }

  var cmd_object = Object.entries(term_commands).filter(([a, b]) => b.cmd === cmd || b.aliases?.includes(cmd))?.[0]?.[1];

  if (!cmd_object) return term.echo(i18n.t('commands.unknown_command')).id();
  cmd_object.handler('CONSOLE', args);
}, {
  name: 'mineprompt',
  prompt: 'MinePrompt \u00bb ',
  autocompleteMenu: true,
  greetings: function() {
        return `
  __  __ _            ____            v ${appVersion}         _   
 |  \\/  (_)_ __   ___|  _ \\ _ __ ___  _ __ ___  _ __ | |_ 
 | |\\/| | | '_ \\ / _ \\ |_) | '__/ _ \\| '_ ' _ \\| '_ \\| __|
 | |  | | | | | |  __/  __/| | | (_) | | | | | | |_) | |_ 
 |_|  |_|_|_| |_|\\___|_|   |_|  \\___/|_| |_| |_| .__/ \\__|
                                               |_|        
    `;
  },
  onInit: function(term) {

  },
  keymap: {
    "CTRL+R": function() {
      // TODO : Optional 'startClient(bot.lastOptions)' when pressing CTRL + R (Ask for confirmation, 5s delay due to Bukkit's connection-delay)
      return false;
    }
  },
  completion: function() {
    var term = this;
    return new Promise(function(resolve) {
      var command = term.get_command();
      var name = command.match(/^([^\s]*)/)[0];
      var list = [];
      if (name) {
        var word = term.before_cursor(true);
        var regex = new RegExp('^' + $.terminal.escape_regex(word));
        if (name == word) {
          list = Object.keys(term_commands);

          var arrays = Object.entries(term_commands).map(i => i[1].aliases)
          var merged = [].concat.apply([], arrays);

          list = list.concat(merged)
        } else if (command.match(/\s/)) {
          if (term_commands[name]) {
            if (word.match(/^--/)) { // flags for cmd, --*flag
              list = term_commands[name].options.map(function(option) {
                return '--' + option;
              });
            } else { // auto complete for command args, also bot.players's (TODO: Option to add autocomplete: ['players'] to addons)
              list = term_commands[name].args || [];
              list = list.concat(Object.keys(bot.players)) // Add players to list of arguments (Should we make this a command option ?)
            }
          }
        }
      }
      resolve(list);
    });
  }
});