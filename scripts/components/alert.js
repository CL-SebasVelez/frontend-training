class Alert extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({
            'mode': 'open'
        });
    }

    connectedCallback() {
        if (localStorage.getItem('alert') != "true") {
            this._root.innerHTML = `
            <style>
                #welcome-alert {
                    margin: 25px 0;
                    height: 45px;
                    background-color: #DFEFFD;
                    display: grid;
                    grid-template-columns: 1fr 2.5%;
                }
                #welcome-alert ::slotted(*) {
                    color: #1D2121;
                    font-family: "Open Sans";
                    font-size: 14px;
                    letter-spacing: -0.08px;
                    line-height: 19px;
                    padding: 0 273px 0 18px;
                }
                #welcome-alert div{
                    height: 20px;
                    width: 20px;
                    border-radius: 100%;
                    background: #7e8388;
                    text-align: center;
                    color: white;
                    align-self: center;
                    cursor: pointer;
                }
                #welcome-alert div span{
                    font-size: 17px;
                }
            </style>
            <div id="welcome-alert">
                <slot name='text'></slot>
                <div id="close">
                    <span>&times;</span>
                </div>
            </div>
        `;
            this.$closeButton = this._root.querySelector('#close');
            this.$closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log(this.closeAlert());
                this.closeAlert();
            });
        }
    }

    closeAlert(){
        localStorage.setItem('alert',true);
        let alert = document.querySelector('app-alert');
        if(alert) alert.remove();
    }

}

window.customElements.define('app-alert', Alert);