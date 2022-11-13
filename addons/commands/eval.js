module.exports = {
  addon: {
    cmd: 'eval',
    usage: 'eval <code>',
    description: 'Run a segment of code',
    handler: async function(sender, args) {
      if (!bot?.entity) return echo(lang.no_bot);

      let code = args.join(' ');

      // https://github.com/AnIdiotsGuide/discordjs-bot-guide/blob/master/examples/making-an-eval-command.md
      const clean = async (text) => {
        // If our input is a promise, await it before continuing
        if (text && text.constructor.name == "Promise") text = await text;

        // If the response isn't a string, `util.inspect()`
        // is used to 'stringify' the code in a safe way that
        // won't error out on objects with circular references
        // (like Collections, for example)
        if (typeof text !== "string")
          text = require("util").inspect(text, { depth: 1 });

        // Replace symbols with character code alternatives
        text = text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));

        // Send off the cleaned up result
        return text;
        }

        const evaled = eval(code);

      // Put our eval result through the function
      // we defined above
      const cleaned = await clean(evaled);

      echo('[[;indianred;]Eval Results:]')
      echo(`\n[[;goldenrod;]${cleaned}]\n`)
      
    }
  }
};
