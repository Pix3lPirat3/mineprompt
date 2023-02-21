const autoClicker = {
  running: undefined,
  click_interval: 1000,
  blacklist: ['experience_orb'],
  start: () => {
    if (autoClicker.running) return
    autoClicker.running = setInterval(async function () {
      const entity = bot.entityAtCursor()
      if (!entity || autoClicker.blacklist.includes(entity.name)) return bot.swingArm()
      bot.attack(entity, true)
    }, autoClicker.click_interval)
  },
  stop: () => {
    autoClicker.running = clearInterval(autoClicker.running)
  }
}

module.exports = {
  addon: {
    cmd: 'autoclicker',
    usage: 'autoclicker <on/off/speed> [interval {1000ms}]',
    description: 'autoclicker..',
    useConfig: false,
    handler: async function(sender, args) {

      if(!args.length) return term.echo(`[${this.cmd}] ${this.usage}`);

      let interval = args[1] || 1000;

      if(args[0] === 'start') {
        if(autoClicker.running) return term.echo('[Clicker] The autoclicker is already running.');
        term.echo(`[Clicker] Now swinging at ${autoClicker.click_interval}ms speed.`);
        autoClicker.start();
      }

      if(args[0] === 'stop') {
        if(!autoClicker.running) return term.echo('[Clicker] The autoclicker is already off.');
        autoClicker.stop();
      }
      if(args[0] === 'speed') {
        if(args.length === 1) return term.echo(`[Clicker] The clicker is running at: ${autoClicker.click_interval}`);
        let new_speed = args[1];
        autoClicker.click_interval = args[1];
        if(autoClicker.running) {
          autoClicker.stop();
          term.echo(`[Clicker] Now swinging at ${autoClicker.click_interval}ms speed.`);
          autoClicker.start();
        }
      }

    }
  }
};