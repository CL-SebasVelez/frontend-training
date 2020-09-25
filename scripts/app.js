"use strict";

const news = (function () {
    async function getNews(term = "trending",offset = 0,count = 4) {
        return await fetch(`${API_URL}/search?q=${term}&mkt=es-ES&offset=${offset}&count=${count}`, {
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

    function appendNews(term,offset = 0) {
        const data   = getNews(term,offset);
        const parent = document.querySelector('#news');
        var newsHTML = '';
        data.then(news => {
            news.forEach(element => {
                let image = 'image' in element ? element.image.thumbnail.contentUrl : 'https://www.bnd.com/latest-news/ppc7fl/picture222958020/alternates/LANDSCAPE_768/NEWSnew.jpg';
                newsHTML += `
                <news-card class="news-card">
                    <img slot="image" src="${image}" alt="">
                    <p slot="title">${element.name}</p>
                    <p slot="content">${element.description}...</p>
                </news-card>
                `;
            });
            parent.insertAdjacentHTML('beforeend', newsHTML);
        });
        document.querySelector('#more-stories').onclick = ()=>{
            appendNews(term,offset+4);
        };
    }
    return {
        append: appendNews
    }
})();

function submitForm(event,form_id) {
    event.preventDefault();
    if(validateFields(form_id)){
        const data = getDataForm(form_id);
        document.querySelector('body').insertAdjacentHTML('afterbegin',`
        <app-modal>
            <h1 slot="title">All data is correct?</h1>
            <ul slot="content">
                ${data.map(element => `<li><b>${element.name}</b> : ${element.value}</li>`).join('')}
            </ul>
            <a slot="close" id="close" class="btn btn-default c-pointer" onclick="handleSubmit('${form_id}')">Confirm and send</a>
            <a slot="cancel" id="close" class="btn btn-danger c-pointer">Cancel</a>
        </app-modal>`);
    }
}

function getDataForm(id_form) {
    const form = document.querySelector(`#${id_form}`);
    const data = Array.from(
                    new FormData(form),
                    e => {
                        return {
                            name : getLabelForm(e[0]),
                            value: e[1]
                        }
                    }
                );
    return data;
}

function getLabelForm(name) {
    return document.querySelector(`label[for="${name}"]`).innerHTML;
}

function handleSubmit(form_id) {
    document.querySelector(`#${form_id}`).submit();
}

news.append("trending");

