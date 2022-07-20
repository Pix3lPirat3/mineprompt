module.exports = {
  eat: async function() {
    var foodList = bot.registry.foodsByName;
    const foodItems = bot.inventory.items().filter((item) => item.name in foodList).sort((a, b) => foodList[b.name]['foodPoints'] - foodList[a.name]['foodPoints']);
    if(bot.food < 6 && !foodItems.length) {
    	return echo(`[[;#AAAAAA;]Disconnected: "[[;#FF5555;]Safety Kick (Starvation)]"`);
    }
    if (bot.food <= 16 && foodItems.length) {
      let food = foodItems[0];
      console.log('I NEED FOOD.')
      await bot.equip(food)
      return bot.consume();
    }
  }

}