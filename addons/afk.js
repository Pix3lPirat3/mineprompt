module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'afk',
    usage: 'afk',
    description: 'Right clicks the ground often to prevent AFK detection',
    handler: handler
  };


  async function handler(sender, args) {
    toggle();
  }

  var awayInterval;
  function toggle() {
    if(!awayInterval) {
      echo(i18n.t('addons.afk.enabled'));
      touchGrass()
      awayInterval = setInterval(async function() {
        touchGrass()
      }, 1000 * 30);
      return;
    }
    echo(i18n.t('addons.afk.disabled'));
    awayInterval = clearInterval(awayInterval);
  }

  async function touchGrass() {
  	var blockUnderFeet = bot.world.getBlock(bot.entity.position.offset(0, -1, 0));
    await bot.activateBlock(blockUnderFeet)
  }

  return addon;

}