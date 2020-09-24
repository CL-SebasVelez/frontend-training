class NewsCard extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({
            'mode': 'open'
        });
    }

    connectedCallback() {
        this._root.innerHTML = `
            <style>
                .card{
                    height: 404px;
                    width: 403px;
                    max-width:403px;
                    background: transparent;
                }
                .card-image{
                    min-height: 148px;
                    max-height: 148px;
                    margin-bottom: 20px;
                }
                .card-image ::slotted(*){
                    max-width: 403px;
                    width: 100%;
                    min-height: 148px;
                    max-height: 148px;
                    object-fit: cover;
                }
                .card-title{
                    color: #1D2121;
                    font-family: var(--primary-font);
                    font-size: 21px;
                    font-weight: 600;
                    letter-spacing: -0.11px;
                    line-height: 28px;
                    margin-bottom: 20px;
                }
                .card-content{
                    color: #1D2121;
                    font-family: var(--primary-font);
                    font-size: 16px;
                    letter-spacing: -0.09px;
                    line-height: 22px;
                }
            </style>
            <div class="card">
                <div class="card-image">
                    <slot name='image'></slot>
                </div>
                <div class="card-title"><slot name='title'></slot></div>
                <div class="card-content"><slot name='content'></slot></div>
            </div>
            `;
    }
}

window.customElements.define('news-card', NewsCard);