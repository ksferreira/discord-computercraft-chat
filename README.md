# Talk to a Discord chat from Minecraft!
Built using Node and Lua (Thanks to [ElvishJerricco's JSON parser for ComputerCraft](https://pastebin.com/4nRg9CHU))

This project is similar to my "discord controlling computercraft" project, [check it out here!](https://github.com/ksferreira/discord-to-minecraft)

## How it works
Both discord and ComputerCraft talk to eachother using a websocket server.

**The discord bot requires you "calibrate" it by typing any chat into the desired "main" channel.**

## Try it out!
Save a .env file with a discordbot token inside
```
TOKEN=YOUR_TOKEN_HERE
```
and, of course, run 
```bash
npm install
```

Setup for this is different from the turtle project, you have to place both phonemonitor.lua and input.lua into an **ADVACNED** pocket computer, and the json.lua as instructed below.

**Keep in mind: ElvishJerricco's JSON library must be put in a folder titled "api" located in the same directory.**  
**It should look something like this:**
 ```
 disk
   |-whateverfile.lua
   `-api
     `-json.lua
```

## Monitors
You can have more than one monitor hooked up. Feel free to change line 3 of monitor.lua to fit where your monitor is, just make sure you point it to json.lua in the first line.


Alternatively, you can just change the first line of of any of the files to the pathfile of json.lua.

## This was tested using CC: Tweaked on Minecraft 1.12.2, theoretically this should be fine on other versions of Minecraft, as well as vanilla ComputerCraft.
Built using the MIT License, feel free to change the code and mess around with it!
