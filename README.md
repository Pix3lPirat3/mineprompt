<h1 align="center">MinePrompt</h1>
<p align="center"><i>A Mineflayer Terminal created with ElectronJS.</i></p>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/Pix3lPirat3/mineprompt" />
  <img src="https://img.shields.io/github/contributors/Pix3lPirat3/mineprompt" />
  <img src="https://img.shields.io/github/license/Pix3lPirat3/mineprompt" />
</p>

<p align="center">
  <img width="460" height="300" src="https://i.imgur.com/Jar4wMi.png">
</p>

---

### Notice
This is an early release of this project, feel free to contribute and message on Discord (Pix3lPirat3#3858) for support.

If you'd like support for using [Mineflayer](https://github.com/PrismarineJS/mineflayer/) check out their [Discord](https://discord.gg/sMvsKNvPc5)

### Usage

Usage Video: [Pix3lPirat3's Usage YouTube](https://www.youtube.com/watch?v=CK3QPQXZloQ&ab_channel=Pix3lPirat3)

Create your copy of the repository on your system, go to the directory, then install the modules
```bash
npm i
```

Start the terminal by running
```bash
electron .
```
or
```bash
npm run start
```

### Reload Warning

Using the `reload` command reloads the **commands system and language files (only)** by reading and loading the command files into memory. This may cause issues with any events registered in command listeners.

### Planned Features

- [ ] Settings Command `settings developer.openConsole true`
- [ ] Discord Addon (+ implement handling multiple programs open)
- [x] Translations System *(A way for addons to register messages)*

### Commands
*This list is not in any specific order*

- [x] Nearby `nearby <players, mobs>`  (Get the nearby players / mobs)
- [x] Follow `follow <player | stop>`  (Follow a player)
- [x] Goto `goto <player | nearest | stop | xz | xyz>`  (Go to a player, or coordinates)
- [ ] Settings `settings <settings.key> <value>`  (Set a value in the settings)
- [ ] Inventory `inventory` (Show the player's inventory) 
- [ ] Drop `drop <item | all> [amount]` (Drop items from inventory)
- [ ] Collect `collect [item] [amount]` (Collect nearby items)
- [ ] Harvest `harvest <block> [amount]` (Harvest nearby blocks)
- [ ] Autoclicker `autoclicker <speed | start | stop> [jitter]` (Autoclicker - Jitter click (randomize position))
- [ ] Equip `equip <item> [slot]` (Equip an item to hand, or armor to armor slots)
- [ ] Mend `mend <item(s)>` (Equip items with mending in the offhand, once repaired switch and repeat)
- [ ] Fish `fish [amount] [saveDurability]` (Fish, a specific amount, and whether to save durability or not)
- [ ] Build `build <schematic> <location>` (Advanced command, will be a way-later-project, and definitely will have tons of flaws)
- [x] Eat `eat [item]` (Eat an item (sorted by food points), optionally specify an item)
- [ ] Move `move <left|right|backwards|forwards|north|east|south|west> [amount]` (Move a specific amount of blocks in a direction)
- [ ] AFK `afk <method>` (Use a specific method of anti-afk, such as left/right clicking, jumping, moving, and so on)
- [ ] Farm `farm <crop> [time] [region]` (Farm a crop for an optional time, and in an optional region. Storage chests can be defined)
- [ ] Quarry `quarry [depth]` (Quarry a chunk to a specific depth / Y coordinate)
- [ ] Mineshaft `mineshaft <type> <distance/time>` (Create a mineshaft at current coordinates, branch mining)
- [x] Lookat `lookat <player|direction|block>` (Look at a specific player, direction, or block)
- [ ] Generator `generator [saveDurability] [switchTools] [mendingOnly]` (Stationary mining, e.g. cobblestone generators)

### License

This project uses the [MIT](https://github.com/Pix3lPirat3/mineprompt/blob/main/LICENSE) license.

### Contributions

You're welcome create a PR, and report issues. You can do that via GitHub Issues or via Discord.
