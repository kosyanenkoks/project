class Image extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.imgHolder = this.shadow.appendChild(
            document.createElement("div")
        );
        this.img = this.imgHolder.appendChild(
            document.createElement("img")
        );

        // let _thisImg =  this.img;
        // window.addEventListener('showBigImg', function(event){
        //     let srcVal = event.detail.src;
        //     _thisImg.setAttribute('src', srcVal)
        // });

        this.img.onclick = function (event) {

        }

    }

    connectedCallback() {

    }
}

customElements.define('big-image', Image);