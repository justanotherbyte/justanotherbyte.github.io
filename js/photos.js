async function renderPhotos() {
    let resp = await fetch("data/photos/meta.json")
    let images = await resp.json();

    let data = {
        "image": images
    };

    let hb = document.getElementById("photography-hb").innerHTML;
    let grid = document.getElementById("photography-grid");

    let template = Handlebars.compile(hb);
    grid.innerHTML = template(data);
}

function updateModalImage(img) {
    document.getElementById("modalImage").src = `data/photos/${img}`;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("imageModal").classList.remove("hidden");
})

renderPhotos();