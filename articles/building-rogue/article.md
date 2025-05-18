# Building Rogue
<br>

Rogue (which can be found on this [GitHub Repository](https://github.com/justanotherbyte/rogue)), is an operating system written with the goal of being a tiny retro gaming system, allowing people to write their own small retro games with a custom scripting language, which will likely use [pest.rs](https://pest.rs).
Progress on Rogue will be updated on this article, however it may expand to multiple articles should I continue to stick to my development schedule.

<br>

## Setting up my environment
<br>

This project relies heavily on jsandler18's [blog series](https://jsandler18.github.io/tutorial/dev-env.html) on writing an OS for the Raspberry Pi in C, so there will be heavy similarities during the initial sections, but will soon become readily different as our projects diverge in scope.

<br>

Of course, the beginning of any Rust project's life starts with the usual cargo commands, however, as we step into our `main.rs` file, we immediately diverge from familiar development.

<br>

```rust
#![no_std]
#![no_main]

#[no_mangle]
fn _start_rust() -> ! {
  // We'll come back to this
}
```

<br>

There's a lot here that may be unfamiliar (certainly was to me). We'll untangle this mess from top to bottom. `#![no_std]` simply tells the Rust compiler to not compile and link the standard library. This is important since the architecture we'll be targeting has no standard library support, since it must assume support for various features of its host system such as threads, networking and heap allocation. We want to write the OS, so we can't rely on any OS-dependent libraries. The perceptive ones out there will have realized that this means we'll need to implement a lot ourselves. That's part of the fun!

<br>

You may have noticed that the traditional `main` entry point cannot be seen. `#![no_main]` tells the compiler that the traditional `main` function is no longer our entry point, and instead we'll be implementing our own. `main` simply doesn't make sense if there's no underlying runtime that calls it. We'll be overriding it with our own `_start_rust` function.

<br>

We'll go into the details of the `#[no_mangle]` macro a bit later, but first I'd like to focus on the `_start_rust` function. It's return type has been annotated as `!` which certainly seems unusual. A typo perhaps? Nope! The exclamation is simply the `never` type, which tells the compiler that the function in question will **never** return. I'll explain this fact in detail once we get into the details of the boot process.

<br>

## Binary Compilation
<br>

Normally, when we compile a Rust project by running `cargo build`, the compiler will compile for our host platform, i.e, to naively simplify, if you compile on a Windows machine, the compiler will compile a Windows executable, but if you compile on a Macbook, the compiler will compile an executable Mac OS can understand. What's different here is the underlying CPU architectures. It's why many programs that run on Intel Macbooks may need updates and re-compilation to run on Apple Silicon (M1, M2, M3, etc) Macbooks.

<br>

So what do we compile for? Well, surely we'd have to compile for the Raspberry Pi 4B's architecture. After too much research, I found the architecture we must target is `aarch64-unknown-none-softfloat`. To streamline this, I'd suggest creating a `.cargo/config.toml`.

<br>

```toml
# .cargo/config.toml

[build]
target = "aarch64-unknown-none-softfloat"
rustflags = [
    "-C",
    "target-cpu=cortex-a72",
    "-C",
    "link-arg=--script=./kernel.ld",
]
```

<br>

This configuration also appends the `target-cpu` and `link-arg` compilation flags, which tell the compiler our CPU is the Cortex A72 (I'm unsure as to whether adding this flag did anything useful, but it can't hurt to have it) and telling it where to find our **linker script**.

<br>

*More coming soon, last updated: 18 May 15:24*

