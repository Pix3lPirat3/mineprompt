var appVersion = require('../package.json').version;

var term_commands = {};

function echo(msg) {
  term.echo(msg);
}

var term = $('#terminal').terminal(function(input) {
  if (input.length === 0) return;
  var command = $.terminal.parse_command(input);
  var cmd = command.name;
  var args = command.args;

  var cmd_object = Object.entries(term_commands).filter(([a, b]) => b.cmd === cmd || b.aliases?.includes(cmd))?.[0]?.[1];

  if (!cmd_object) return echo('[[;#FF5555;]Unknown command. Type "help" for help.]');
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
    term.echo('Usage:\nconnect -u [username] -h <host> -p [port] -v <version> --auth [true\\false]');
    $('#footer-left').html(`MinePrompt v${appVersion} by <a href="#" style="color: steelblue; text-decoration: none;" target="_blank">Pix3lPirat3#3858</a>`);
    $('#footer-right').html(`<a href="http://mineprompt.com" style="color: steelblue; text-decoration: none;" target="_blank">Documentation</a>`);
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
      if (!name) resolve(list);
      var word = term.before_cursor(true);
      var regex = new RegExp('^' + $.terminal.escape_regex(word));
      if (name == word) {
        list = Object.keys(term_commands);

        var arrays = Object.entries(term_commands).map(([a, b]) => b.aliases);
        var merged = [].concat.apply([], arrays);

        list = list.concat(merged)
      } else if (command.match(/\s/)) { // There was a space, autocomplete args

        // Grab the matched command
        var cmd_object = Object.entries(term_commands).filter(([a, b]) => b.aliases?.includes(name) || b.cmd === name)[0]?.[1];
        if (cmd_object) {
          // If there is a command object, grab it's tab-completeable arguments
          if (cmd_object.autocomplete?.includes('args')) list = list.concat(cmd_object.args);
          if (cmd_object.autocomplete?.includes('players') && bot?.players) list = list.concat(Object.keys(bot.players));
        }
      }
      resolve(list);
    });
  }
});