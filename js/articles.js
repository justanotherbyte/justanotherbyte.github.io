async function renderArticle(slug) {  
    let converter = new showdown.Converter();
    let resp = await fetch(`articles/${slug}/article.md`);

    let md = await resp.text();
    let html = converter.makeHtml(md);

    let articleMain = document.getElementById("articleMain");
    articleMain.innerHTML = html;

    hljs.highlightAll();
}

async function renderOverviewPage() {
    let resp = await fetch("articles/meta.json");
    let data = await resp.json();

    let context = {
        "categories": data
    }

    let hb = document.getElementById("overview-hb").innerHTML;
    let articleMain = document.getElementById("articleMain");

    let template = Handlebars.compile(hb);
    articleMain.innerHTML = template(context);
}

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });

let slug = params.slug;
if (slug == null) {
    renderOverviewPage();
} else {
    renderArticle(slug)
}
