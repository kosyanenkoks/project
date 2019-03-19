class Image extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'})
    }
}

customElements.define('big-image', Image);