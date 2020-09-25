class Modal extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({
            'mode': 'open'
        });
    }

    connectedCallback() {
        this._root.innerHTML = `
            <style>
                .modal {
                    position: fixed;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    background: rgba(0, 0, 0, 0.8);
                    z-index: 99999;
                    opacity: 1;
                    -webkit-transition: opacity 400ms ease-in;
                    -moz-transition: opacity 400ms ease-in;
                    transition: opacity 400ms ease-in;
                }
                .modal-content {
                    background: #fefefe;
                    width: 400px;
                    height: auto;
                    position: relative;
                    margin: 5% auto;
                    padding: 30px;
                    border-radius: 5px;
                }
            </style>
            <div class="modal" id="modal-one">
                <div class="modal-content">
                    <slot name="title"></slot>
                    <slot name="content"></slot>
                    <slot name="close"></slot>
                    <slot name="cancel"></slot>
                </div>
            </div>
        `;
        this.shadowRoot.querySelector('[name="cancel"]').onclick = ()=>{
            this.closeAlert();
        };
    }

    closeAlert() {
        document.querySelector('app-modal').remove();
    }


}

window.customElements.define('app-modal', Modal);