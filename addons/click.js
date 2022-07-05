var Vec3 = require('Vec3');
const { RaycastIterator } = require('prismarine-world').iterators;
var utils = require('../utils.js');

module.exports = function(bot) {

  var addon = {
    type: 'command',
    cmd: 'click',
    aliases: ['click'],
    usage: 'click [left/right] [interval]',
    description: 'Used to automatically click left or right',
    handler: handler
  };

  var autoclicker = {
  	interval: null,
  	options: {
      max_distance: 3.5,
      swing_through: ['experience_orb'],
      blacklist: ['player'],
      always_swing: true, // Send a fake swing, if there is no entity or the entity is blacklisted
  	}
  };



  async function handler(sender, args) {

  	if(autoclicker.interval || args[0] === 'stop') { // The auto clicker is already running
  		autoclicker.interval = clearInterval(autoclicker.interval)
      return term.echo(i18n.t('addons.click.disabled')).id();
  	}

  	var clickType = Object.entries({left: ['l', 'left'], right: ['r', 'right']}).filter(([a, b]) => b.includes(args[0]))?.[0]?.[0] || 'left' // left / right (Default: left)
  	var clickSpeed = Number(args[0]) ? args[0] : 2000;
  	if(args.length === 2) clickSpeed = Number(args[1])

    term.echo(i18n.t('addons.click.enabled', { clickType: clickType, clickSpeed: clickSpeed}))

  	autoclicker.interval = setInterval(async function() {
      let entity = entityAtCursor(autoclicker.options.max_distance, autoclicker.options.swing_through);
      if(bot.currentWindow) return; // Don't swing is a window is open
      if (!entity || autoclicker.options.blacklist.includes(entity.name)) {
          return autoclicker.options.always_swing ? bot.swingArm() : null;
      }
      bot.attack(entity, true);
    }, clickSpeed);
  	
  }

    // swing_through - Can be used for entities such as an experience_orb, that has an empty collision box
    function entityAtCursor(maxDistance = 3.5, swing_through = ['experience_orb']) {
      const block = bot.blockAtCursor(maxDistance)
      maxDistance = block ?.intersect.distanceTo(bot.entity.position)??maxDistance

      const entities = Object.values(bot.entities)
        .filter(entity => entity.type !== 'object' && entity.username !== bot.username && entity.position.distanceTo(bot.entity.position) <= maxDistance && !swing_through.includes(entity.name))

      const dir = new Vec3(-Math.sin(bot.entity.yaw) * Math.cos(bot.entity.pitch), Math.sin(bot.entity.pitch), -Math.cos(bot.entity.yaw) * Math.cos(bot.entity.pitch))
      const iterator = new RaycastIterator(bot.entity.position.offset(0, bot.entity.height, 0), dir.normalize(), maxDistance)

      let targetEntity = null
      let targetDist = maxDistance

      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i]
        const w = entity.width / 2

        const shapes = [
          [-w, 0, -w, w, entity.height + (entity.type === 'player' ? 0.18 : 0), w]
        ]
        const intersect = iterator.intersect(shapes, entity.position)
        if (intersect) {
          const entityDir = entity.position.minus(bot.entity.position) // Can be combined into 1 line
          const sign = Math.sign(entityDir.dot(dir))
          if (sign !== -1) {
            const dist = bot.entity.position.distanceTo(intersect.pos)
            if (dist < targetDist) {
              targetEntity = entity
              targetDist = dist
            }
          }
        }
      }

      return targetEntity
    }

  return addon;

}
