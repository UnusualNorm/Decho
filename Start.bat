@echo off
set cdir=%cd%
cd %cdir%\servers\
start deno run -A --unstable GameServer.ts
start deno run -A --unstable PingServer.ts
start deno run -A --unstable PingServer2.ts
cd %cdir%
deno run -A mod.ts
pause