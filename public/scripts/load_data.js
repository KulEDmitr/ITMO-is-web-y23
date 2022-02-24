const baseUrl = "https://jsonplaceholder.typicode.com/photos"
let container = document.getElementById("loaded__items__wrapper")

const createTemplate = (item) => {
    let template = document.getElementById("template__loaded__item").content.cloneNode(true);
    template.getElementById('loaded__item__image').setAttribute('src', item.url);
    template.getElementById('loaded__item__description').innerHTML = item.title;

    return template;
}

document.getElementById("clear__button").onclick = () => {
    let items = document.getElementsByClassName("loaded__item");
    while(items.length > 1){
        items[1].remove();
    }
}

function error() {
    return {
        url: "images/error.png",
        title: "⚠ Что-то пошло не так"
    }
}

document.getElementById("down__button").onclick = () => {
    document.body.classList.remove('loaded')
    document.body.classList.add('loading');
    
    let album = Math.floor(Math.random() * 100) + 1;
    console.log(album)

    let url = baseUrl + "?albumId=" + album
    
    fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                return error()
            }
        }).then((json) => {
            json.forEach((item) => {
                container.appendChild(createTemplate(item));
            })
        }).then(() => {
            document.body.classList.add('loaded');
            document.body.classList.remove('loading');
        }).catch(() => {
            container.appendChild(createTemplate(error()));
            document.body.classList.add('loaded');
            document.body.classList.remove('loading');
        });
}
