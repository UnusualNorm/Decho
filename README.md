# Decho

**This isn't finished and most likely wont be for a while.**

A custom implementation of the Echo VR APIs, written in
[Deno](https://deno.land)

## Running/Installation

Given this implementation uses Deno, you must install Deno. See
[Deno Installation](https://deno.land/manual/getting_started/installation) for
specific steps on how to install it for your system. Deno is available on most
commonly used operating systems and kernels and can run on a variety of
machines.

Then, once Deno is properly installed and available on the command-line, you can
start [Decho](https://github.com/UnusualNorm/Decho) using

```bash
deno run -A mod.ts
```

## Debugging

For debugging purposes, an option is available to trigger debug mode. Debug mode
allows the host to preview the packets being sent to the server at runtime in
the command-line. This can be enabled by changing the DEBUG variable in the .env
file to the following.

```bash
DEBUG=true
```

## Contributing

Feel free to send a Pull Request
[here](https://github.com/UnusualNorm/Decho/pulls) to contribute further towards
a more open and easily accessible Echo VR to current and future players.
