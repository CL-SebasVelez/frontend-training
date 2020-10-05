class Alert extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({
      mode: 'open',
    });
  }

  connectedCallback() {
    if (localStorage.getItem('alert') !== 'true') {
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
                    font-family: 'Open Sans';
                    font-size: 14px;
                    letter-spacing: -0.08px;
                    line-height: 19px;
                    padding: 0 18px;
                }
                #welcome-alert button{
                    height: 20px;
                    width: 20px;
                    border-radius: 100%;
                    background: #7e8388;
                    text-align: center;
                    color: white;
                    align-self: center;
                    cursor: pointer;
                    position: relative;
                    border: none;
                    display:flex;
                    justify-content:center;
                    align-items: baseline;
                }
                #welcome-alert button span{
                    font-size: 17px;
                }
                @media (min-width: 320px) and (max-width: 480px) {
                    #welcome-alert{
                        width:100%;
                        height: auto;
                        grid-template-columns: 1fr 7%;
                    }
                }
            </style>
            <div id='welcome-alert'>
                <slot name='text'></slot>
                <button id='close'>
                    <span>&times;</span>
                </button>
            </div>
        `;
      this.$closeButton = this._root.querySelector('#close');
      this.$closeButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeAlert();
      });
    }
  }

  closeAlert() {
    localStorage.setItem('alert', true);
    const alert = document.querySelector('app-alert');
    if (alert) alert.remove();
  }
}

window.customElements.define('app-alert', Alert);