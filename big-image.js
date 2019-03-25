class Image extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.imgHolder = this.shadow.appendChild(
            document.createElement("div")
        );
        this.imgHolder.className = 'img-holder';
        this.img = this.imgHolder.appendChild(
            document.createElement("img")
        );
        this.textBlock = this.imgHolder.appendChild(
            document.createElement("div")
        );

        this.shadowStyle = this.shadow.appendChild (
            document.createElement ('style')
        );
        this.shadowStyle.textContent = ``;
        this.setStyle();
    }

    connectedCallback() {

    }

    setStyle() {
        this.shadowStyle.textContent = `
            .img-holder {
                position: relative;
            }
        `
    }

}

customElements.define('big-image', Image);