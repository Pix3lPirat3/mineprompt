module.exports = {
  addon: {
    cmd: 'afk',
    args: ['jump', 'leftclick', 'rightclick', 'sneak', 'rotate'],
    autocomplete: ['args'],
    aliases: ['away', 'awayfromkeyboard'],
    usage: 'afk <jump|leftclick|rightclick|sneak|rotate> <interval(ms)>',
    description: 'Use a method of anti-afk to not be AFK kicked',
    useConfig: true,
    listeners: [],
    intervals: [],
    onReload: function() {
      this.listeners.forEach(listener => {
        if(listener.type === 'bot') bot.removeListener(listener.event, listener.function);
        if(listener.type === 'bot._client') bot._client.removeListener(listener.event, listener.function)
      })
      this.intervals.forEach(interval => {
        clearInterval(interval)
      })
    },
    handler: async function(sender, args) {
      let lang = this.config.lang;
      let settings = this.config.settings;
      if (!bot?.entity) return echo(lang.no_bot);
      
      let method = args[0].toLowerCase();
      let interval = Number(args[1]) || 2000;

      if(!this.args.includes(method)) return echo(lang.unknown_method.replace('{method}', method));

      echo(lang.starting.replace('{method}', method).replace('{interval}', interval));

      switch(method) {
        case "jump":
          this.intervals.push(setInterval(async function() {
            bot.setControlState('jump', true);
            bot.setControlState('jump', false);
          }, interval))
          break;
        case "leftclick":
          this.intervals.push(setInterval(async function() {
            const entity = bot.entityAtCursor();
            if (!entity) return bot.swingArm();
            bot.attack(entity, true);
          }, interval))
          break;
        case "rightclick":
          this.intervals.push(setInterval(async function() {

            let block = bot.blockAtCursor(3.5);
            if(block) return bot.activateBlock(block)
            if(!block) return bot.activateItem(), bot.deactivateItem();

          }, interval))

          // bot.activateBlock(block, direction?: Vec3, cursorPos?: Vec3)
          break;
        case "sneak":
          this.intervals.push(setInterval(async function() {
            bot.setControlState('sneak', true);
            bot.setControlState('sneak', false);
          }, interval))
          break;
        case "rotate":
          let turns = [1.5708, 3.14159, 4.71239, 6.28319]
          let location = 0;
          this.intervals.push(setInterval(async function() {
            var item = turns[Math.floor(Math.random() * turns.length)];
            await bot.look(item, 0, false)
          }, interval))
          break;
      }

    }
  }
};
