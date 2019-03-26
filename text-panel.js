class TextPanel extends HTMLElement {
    constructor() {
        super();
        //-------------------------------------------------
        // Creating elements
        //-------------------------------------------------
        this.shadow = this.attachShadow({mode: 'open'});
        this.panelHolder = this.shadow.appendChild(
            document.createElement("div")
        );
        this.panelHolder.className = 'panel-holder';
        this.inputArea = this.panelHolder.appendChild(
            document.createElement('div')
        );
        this.inputArea.className = 'text-holder';
        this.input = this.inputArea.appendChild(
            document.createElement('input')
        );
        this.input.type = 'text';
        this.outputText = this.inputArea.appendChild(
            document.createElement("div")
        );
        this.outputText.className = 'result';
        this.errorText = this.inputArea.appendChild(
            document.createElement("p")
        );
        this.errorText.classList.add('error', 'error--text');
        this.errorText.innerText = 'Write what you want';
        this.extraErrorText = this.inputArea.appendChild(
            document.createElement("p")
        );
        this.extraErrorText.innerText = 'Select img first';
        this.extraErrorText.classList.add('error', 'error--img');
        this.button = this.inputArea.appendChild(
            document.createElement("button")
        );
        this.button.innerText = 'Add';



        this.shadowStyle = this.shadow.appendChild (
            document.createElement ('style')
        );
        this.shadowStyle.textContent = ``;
        this.setStyle();
        //-------------------------------------------------

        //-------------------------------------------------
        // showing input result
        //-------------------------------------------------
        const typeHandler = event => this.outputText.innerHTML = event.target.value;
        this.input.addEventListener('input', typeHandler);
        //-------------------------------------------------

        //-------------------------------------------------
        // customize user text
        //-------------------------------------------------
        this.setColor('blue');
        this.setFontSize(24);
        this.setFontFamily('Pacifico');
        //-------------------------------------------------

        //-------------------------------------------------
        // insert text on Big Image & input validation
        //-------------------------------------------------

        const insertText = event => {
            let textBlock = bigImgHolder.textBlock;
            let bigImg = bigImgHolder.img;

            const success = () => {
                textBlock.innerText = this.input.value;
                textBlock.setAttribute('style', getAttrVal(this.outputText, 'style'));
                this.inputArea.classList.remove('img-error');
                this.inputArea.classList.remove('input-error');
            };

            const absenceOfText = () => {
                console.log(this.inputArea)
                this.inputArea.classList.add('input-error');
            };

            const absenceOfImg = () => {
                console.log(this.inputArea)
                this.inputArea.classList.add('img-error');
            };

            if (this.input.value.length > 0 && bigImg.hasAttribute('src')) {
                console.log(1)
                success();
            } else if (! bigImg.hasAttribute('src')){
                console.log(2)
                absenceOfImg();
            } else if (this.input.value.length == 0) {
                console.log(3)
                absenceOfText();
            } else if (! bigImg.hasAttribute('src') && ! this.input.value.length == 0){
                console.log(4)
                absenceOfImg();
                absenceOfText();
            } else {console.log(5)}

            // if (this.input.value.length > 0 && bigImg.hasAttribute('src')) {
            //     textBlock.innerText = this.input.value;
            //     textBlock.setAttribute('style', getAttrVal(this.outputText, 'style'));
            // } else {
            //     this.inputArea.classList.add('error');
            //     this.errorText.innerText = 'Write what you want';
            // }
        };
        this.button.addEventListener('click', insertText);

        const validationInput = () => {
            if (this.inputArea.classList.contains('error') && this.input.value.length > 0) {
                this.inputArea.classList.remove('error');
            }
        };

        this.input.addEventListener('input', validationInput)
        //-------------------------------------------------

    }

    connectedCallback() {

    }

    setStyle() {
        this.shadowStyle.textContent = `
            .error {
                position: absolute;
                visibility: hidden;
                opacity: 0;
                transition: opacity .3s ease-in;
            }
            
            .input-error .error--text,
            .img-error .error--img {
                position: static;
                visibility: visible;
                opacity: 1;
            }
        `
    }

    setColor(color) {
        this.outputText.style.color = color;
    }

    setFontSize(fontSize) {
        this.outputText.style.fontSize = `${fontSize}px`;
    }

    setFontFamily(fontName) {
        this.outputText.style.fontFamily = `${fontName},  Arial, sans-serif`;
    }

}

customElements.define('text-panel', TextPanel);