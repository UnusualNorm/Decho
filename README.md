# Decho

**This isn't finished and most likely wont be for a while.**

A custom implementation of the Echo VR APIs, written in [Deno](https://deno.land)

## Running/Installation

Given this implementation uses Deno, you must install Deno. See [Deno Installation](https://deno.land/manual/getting_started/installation) for specific steps on how to install it for your system. Deno is available on most commonly used operating systems and kernels and can run on a variety of machines.

Then, once Deno is properly installed and available on the command-line, you can start [Decho](https://github.com/UnusualNorm/Decho) by going into the Decho folder and running the "Start.bat" File. You can also still run everything manually using Deno. The command is

```bash
deno run -A mod.ts
```
If you would like to also run the Game & Ping Servers You will also have to start this with the command above just make sure to add the ``--unstable`` arguement

Upon running the Start.bat file, You will see 4 windows appear please leave those all open the 4 windows are: The Config / Matchmaking Server, The 2 Ping Server and The Game Server (No you cannot play actual game on this server just yet but it is to collect as much data as you can) These windows do not have to be focused at all times just make sure they are open in the background


## Debugging

For debugging purposes, an option is available to trigger debug mode. Debug mode allows the host to preview the packets being sent to the server at runtime in the command-line. This can be enabled by changing the DEBUG variable in the .env file to the following.

```bash
DEBUG=true
```
This is currently on by default due to the fact we are in a development stage, If you would like to disable DEBUG mode goto the env file and replace true with
```bash
DEBUG=false
```

## Contributing

Feel free to send a Pull Request [here](https://github.com/UnusualNorm/Decho/pulls) to contribute further towards a more open and easily accessible Echo VR to current and future players.
