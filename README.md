# GT-MP Vehicle Handling Manager
This tool should help you to set custom vehicle handlings for your player, it also prevents that players using their own customized vehicle handling (like modded game files).

The handling data be saved automatically on renew or server shutdown and loaded on startup.

**Min. Required GT-MP Version:** 0.1.7.x

![](https://img.shields.io/github/release/MrNeta/GT-MP-Vehicle-Handling-Manager.svg?maxAge=2592000)
![](https://img.shields.io/github/downloads/MrNeta/GT-MP-Vehicle-Handling-Manager/total.svg?maxAge=2592000)
![](https://img.shields.io/badge/GT--MP%20Version-0.1.7.x-brightgreen.svg?maxAge=2592000)


# Commands
`/renewhandlingdata` Uses the handling data of the current player and send it to the server.

`/applyhandlingdata` Manually apply the handling data to the current player.

`/applyhandlingdatatoall` Manually apply the handling data to all players.

# Settings
`sethandlingonconncect` If true, applies the current handling data of the server on connect of any player.