<h1 align="center">MinePrompt (DEPRECATED)</h1>
<p align="center"><i>This project is now deprecated, use <a href="https://github.com/Pix3lPirat3/mineprompt_rewritten">mineprompt rewritten</a></i></p>
<p align="center"><i>A Mineflayer Terminal created with ElectronJS.</i></p>

<p align="center">
  <a href="https://discord.gg/5FV56jKwpk"><img src="https://img.shields.io/discord/1041349721916186725"></a>
  <img src="https://img.shields.io/github/repo-size/Pix3lPirat3/mineprompt" />
  <img src="https://img.shields.io/github/contributors/Pix3lPirat3/mineprompt" />
  <img src="https://img.shields.io/github/license/Pix3lPirat3/mineprompt" />
</p>

<p align="center">
  <a href="https://discord.gg/mS593SMRVh"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white"></a>
</p>

<p align="center">
  <img width="460" height="300" src="https://i.imgur.com/Jar4wMi.png">
</p>

---

Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

This work is licensed under a
[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa].

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

---

### Notice
You can check out the updated version of MinePrompt at https://discord.gg/5FV56jKwpk

If you'd like support for using [Mineflayer](https://github.com/PrismarineJS/mineflayer/) check out their [Discord](https://discord.gg/sMvsKNvPc5)

### Usage

Usage Video: [Pix3lPirat3's Usage YouTube](https://www.youtube.com/watch?v=CK3QPQXZloQ&ab_channel=Pix3lPirat3)

Create your copy of the repository on your system, go to the directory, then install the modules. This includes [ElectronJS](https://www.npmjs.com/package/electron)
```bash
npm i
npm i electron -g
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

Using the `reload` command reloads the **commands system and language files (only)** by reading and loading the command files into memory. This may cause issues with any events registered in command listeners, as they're set on variables that are not reloaded, such as `bot`.

### Planned Features

- [ ] Settings Command `settings developer.openConsole true`
- [ ] Discord Addon (+ implement handling multiple programs open)
- [x] Translations System *(A way for addons to register messages)*

### Commands
*This list is not in any specific order*

- [x] Nearby `nearby <players, mobs>`  (Get the nearby players / mobs)
- [x] Follow `follow <player | stop>`  (Follow a player)
- [x] Goto `goto <player | nearest | stop | xz | xyz>`  (Go to a player, or coordinates)
- [x] Lookat `lookat <player|direction|block>` (Look at a specific player, direction, or block)
- [x] Eat `eat [item]` (Eat an item (sorted by food points), optionally specify an item)
- [x] Players `players` (Get a list of online players)
- [x] Quit `quit` (Gracefully quits the server)
- [x] AFK `afk <method>` (Use a specific method of anti-afk, such as left/right clicking, jumping, moving, and so on)
- [x] Chat `chat <message>` (Sends your message to the in-game chat)
- [x] Cmd `cmd <command>` (Sends your command to the in-game chat)
- [x] Eval `eval <code>` (Evaluates the specified code, returns the result)
- [x] Addowner `addowner <player>` (Adds player as a master - to use in-game commands)
- [x] Removeowner `removeowner <player>` (Removes player as a master)
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
- [ ] Move `move <left|right|backwards|forwards|north|east|south|west> [amount]` (Move a specific amount of blocks in a direction)
- [ ] Farm `farm <crop> [time] [region]` (Farm a crop for an optional time, and in an optional region. Storage chests can be defined)
- [ ] Quarry `quarry [depth]` (Quarry a chunk to a specific depth / Y coordinate)
- [ ] Mineshaft `mineshaft <type> <distance/time>` (Create a mineshaft at current coordinates, branch mining)
- [ ] Generator `generator [saveDurability] [switchTools] [mendingOnly]` (Stationary mining, e.g. cobblestone generators)

### License

This project uses the [MIT](https://github.com/Pix3lPirat3/mineprompt/blob/main/LICENSE) license.

### Contributions

You're welcome create a PR, and report issues. You can do that via GitHub Issues or via Discord.
