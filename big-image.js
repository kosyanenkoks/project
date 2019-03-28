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

        //-------------------------------------------------
        // drag and drop of element
        //-------------------------------------------------
        const dragElement = elem => {
            elem.onmousedown = function (event) {
                this.style.position = 'absolute';
                moveAt(event);
                this.style.zIndex = 1000;
                function moveAt(event) {
                    elem.style.left = event.pageX - elem.offsetWidth / 2 + 'px';
                    elem.style.top = event.pageY - elem.offsetHeight / 2 + 'px';
                }

                document.onmousemove = function(event) {
                    moveAt(event);
                };

                this.onmouseup = function() {
                    document.onmousemove = null;
                    elem.onmouseup = null;
                }
            }
        };

        this.addEventListener('onmousedown', dragElement(this.textBlock))
        //-------------------------------------------------
    }

    connectedCallback() {

    }

    setStyle() {
        this.shadowStyle.textContent = `
            .img-holder {
                overflow: hidden;
            }
        `
    }

}

customElements.define('big-image', Image);