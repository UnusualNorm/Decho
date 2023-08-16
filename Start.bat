@echo off
set cdir=%cd%
cd %cdir%\server\
start GameServer.py
start PingServer.py
start PingServer2.py
cd %cdir%
deno run -A mod.ts
pause