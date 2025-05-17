function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function deleteText(element) {
    while (element.innerText) {
        await sleep(250);
        let currentText = element.innerText;
        let newText = currentText.slice(0, -1);
        element.innerText = newText;
    }
}

async function writeText(element, text) {
    element.innerText = "";
    for (let i = 0; i < text.length; i++) {
        element.innerText += text[i];
        await sleep(250);
    }
}

async function cycleText(choices) {
    let element = document.getElementById("welcomeText");
    element.innerText = choices[0];

    await sleep(2 * 1000);

    let currentIdx = 1;
    while (true) {
        await deleteText(element);
        await writeText(element, choices[currentIdx]);
        currentIdx += 1;
        if (currentIdx == choices.length) {
            currentIdx = 0;
        }
        await sleep(2 * 1000);
    }
}

cycleText(["Hello!", "こんにちは!", "你好!", "안녕하세요!", "హలో!", "नमस्ते!"]);