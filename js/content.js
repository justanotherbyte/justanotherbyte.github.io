async function getPinnedRepos() {
    let resp = await fetch("https://pinned.berrysauce.dev/get/justanotherbyte");
    return await resp.json();
}

async function getArticles() {
    let resp = await fetch("articles/meta.json");
    return await resp.json();
}

async function renderRepos() {
    let repos = await getPinnedRepos();
    let data = {
        "repos": repos
    };

    let hb = document.getElementById("projects-hb").innerHTML;
    let grid = document.getElementById("projects-grid");

    let template = Handlebars.compile(hb);
    grid.innerHTML = template(data);
}

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
}

function chooseRandomPosts(payload) {
    let articles = [];
    for (let i = 0; i < payload.length; i++) {
        for (let k = 0; k < payload[i]["posts"].length; k++) {
            articles.push(payload[i]["posts"][k]);
        }
    }

    shuffle(articles);

    let n = Math.min(articles.length, 4);
    let chosen = [];

    for (let p = 0; p < n; p++) {
        chosen.push(articles[p]);
    }

    return chosen;
}

async function renderArticles() {
    let articles = await getArticles();
    let chosen = chooseRandomPosts(articles);
    let data = {
        "articles": chosen
    };

    let hb = document.getElementById("publications-hb").innerHTML;
    let grid = document.getElementById("publications-grid");

    let template = Handlebars.compile(hb);
    grid.innerHTML = template(data);
}

renderRepos();
renderArticles();