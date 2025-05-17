# Building Rogue
<br>

**Silicon Valley, CA —** What started as a Friday night experiment with coffee and existential boredom turned into a fully functioning operating system by Sunday evening.

> “I just wanted to see if I could write a bootloader,” said 26-year-old software engineer Blake Syntheson. “Next thing I knew, I had memory management, a filesystem, a CLI, and an existential crisis.”

<br>

## Friday: Bootloaders and Bad Decisions

It all began when Blake stumbled across a blog titled *“Writing a Tiny OS in 30 Days.”* Laughing in the face of caution and planning, he decided to attempt it in three.

Armed with nothing but a Rust compiler, an old ThinkPad, and a playlist called **“Aggressive Syntax Errors,”** he wrote a custom bootloader in assembly.

> “I thought, if I can print ‘Hello, world!’ from the boot sector, I basically have an OS, right?” Blake said, visibly twitching.

<br>

## Saturday: Paging, Panics, and Pizza

By Saturday, things escalated. After successfully enabling paging and mapping kernel memory, Blake attempted to implement multitasking.

> “I figured if I could switch between two threads, that’s like, 100% of what Linux does.”

Sleep-deprived and hallucinating syntax, he built a primitive scheduler and keyboard driver from scratch.

> “I was talking to the IRQ handler like it was my roommate,” he admitted. “We had a falling out when I messed up the interrupt table.”

<br>

## Sunday: File Systems and Fame

Sunday brought the miracle: a working filesystem called **NotFAT32**, and a command-line interface named **RegretShell™**. It could list files, echo text, and — after some questionable code gymnastics — play *Doom* at 3 FPS.

By Sunday evening, Blake’s tweet about the project went viral.

> “I didn’t even name the OS. People just started calling it ‘BlakeOS.’”

<br>

## Industry Reaction

Experts are baffled.

> “It’s not POSIX-compliant, it has no security model, and it reboots if you type `cat` too fast,” said one kernel developer. “But it technically boots, so it’s better than 80% of OS projects out there.”

Red Hat and Microsoft have declined to comment. Linus Torvalds reportedly chuckled once and went back to his email queue.

<br>

## What’s Next for BlakeOS?

Blake says he's shelving the project.

> “It’s done. It’s perfect in its chaotic incompleteness. Also, I need sleep and maybe therapy.”

Still, fans are porting it to everything from Raspberry Pi to smart toasters.

As for Blake? He’s working on a new project: a text editor that never crashes — *but crashes if you call it an IDE*.

<br>

## Code Test

Here's an epic code test

```javascript
async function renderArticle() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });

    let article = params.slug;

      
    let converter = new showdown.Converter();
    let resp = await fetch(`articles/${article}.md`);

    let md = await resp.text();
    let html = converter.makeHtml(md);

    let articleMain = document.getElementById("articleMain");
    articleMain.innerHTML = html;
}

renderArticle()
```

![image](articles/building-rogue/screenshot.png)