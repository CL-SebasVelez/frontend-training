class NewsCard extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({
      mode: 'open',
    });
  }

  static get observedAttributes() {
    return ['open'];
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
                    min-height: 154px;
                    max-height: 154px;
                    margin-bottom: 20px;
                }
                .card-image ::slotted(*){
                    max-width: 403px;
                    width: 100%;
                    min-height: 154px;
                    max-height: 154px;
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
                    height: 84px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: initial;
                }
                .card-content{
                    color: #1D2121;
                    font-family: var(--primary-font);
                    font-size: 16px;
                    letter-spacing: -0.09px;
                    line-height: 22px;
                }

                @media (min-width: 320px) and (max-width: 480px) {
                    .card{
                        width: 350px;
                    }
                }
            </style>
            <div class='card'>
                <div class='card-image'>
                    <slot name='image'></slot>
                </div>
                <div class='card-title'><slot name='title'></slot></div>
                <div class='card-content'><slot name='content'></slot></div>
            </div>
            `;
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    if (val) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  attributeChangedCallback() {
    if (this.open) {
      this.onclick = function () {
        const {
          url
        } = this.dataset;
        window.open(url, '_blank');
      };
      this.classList.add('c-pointer');
    }
  }
}

window.customElements.define('news-card', NewsCard);