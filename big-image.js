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

        let _this =  this.img;


        window.addEventListener('showBigImg', function(e){
            // console.log(e.detail.src)
            let srcVal = e.detail.src;
            _this.setAttribute('src', srcVal)
        });
    }
}

customElements.define('big-image', Image);