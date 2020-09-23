"use strict";

(function () {
    dropdown();
})();

function dropdown() {
    document.querySelector('.dropdown').onclick = function (e) {
        e.stopPropagation();
        this.querySelector('.nav-dropdown').style.display = 'grid';
    };

    document.querySelector('html').onclick = function () {
        this.querySelector('.nav-dropdown').style.display = 'none';
    };
}

const news = (function () {
    async function getNews(term = null) {
        return await fetch(`${API_URL}/search?q=${term}&mkt=es-ES`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": API_HOST,
                    "x-rapidapi-key": API_KEY,
                }
            })
            .then(response => {
                return response.json();
            })
            .then(data => data.value)
            .catch(err => {
                console.log(err);
            });
    }

    function appendNews() {
        const data   = getNews();
        const parent = document.querySelector('#news');
        var newsHTML = '';
        data.then(news => {
            news.forEach(element => {
                console.log(element);
                let image = 'image' in element ? element.image.thumbnail.contentUrl : 'https://images.ctfassets.net/hrltx12pl8hq/1zlEl4XHkxeDuukJUJyQ7Y/a149a908727e2084d503dc103a620d7f/lohp-image-img-3.jpg?fit=fill&w=480&h=270';
                newsHTML += `
                <news-card class="news-card">
                    <img slot="image" src="${image}" alt="">
                    <p slot="title">${element.name}</p>
                    <p slot="content">${element.description}...</p>
                </news-card>
                `;
            });
            parent.insertAdjacentHTML('afterbegin', newsHTML);
        });
    }
    return {
        append: appendNews
    }
})();

news.append();