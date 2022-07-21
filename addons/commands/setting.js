function handler(sender, args) {

}

module.exports = {
  addon: {
    cmd: 'setting',
    aliases: ['settings', 'option', 'options'],
    usage: 'setting <setting.item> <value>',
    description: 'Set a setting value.',
    handler: handler
  }
};