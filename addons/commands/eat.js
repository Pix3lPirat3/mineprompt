module.exports = {
  addon: {
    cmd: 'eat',
    usage: 'eat <item>',
    description: 'Follow a target player.',
    useConfig: true,
    handler: async function(sender, args) {
      let lang = this.config.lang;
      if (!bot?.entity) return echo(lang.no_bot);

      utils.eat(14, ['beetroot', 'cooked_beef', 'apple', 'pumpkin_pie']).then(function(item) {
        echo(`I ate a(n) ${item.name}`)
      }).catch(function(e) {
        if(e.message === 'threshold') return echo(`The bot was too full to eat, skipping.`);
        if(e.message === 'no_food') return echo(`We have no items to eat!`);
        console.log(e)
      });

      
    }
  }
};
