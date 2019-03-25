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
        this.input = this.panelHolder.appendChild(
            document.createElement('input')
        );
        this.input.type = 'text';
        this.input.id = 'title';
        this.outputText = this.panelHolder.appendChild(
            document.createElement("div")
        );
        this.outputText.className = 'result';
        this.outputText.setAttribute('draggable', true);
        this.errorText = this.panelHolder.appendChild(
            document.createElement("p")
        );
        this.button = this.panelHolder.appendChild(
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
        // showing input result for
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
        // insert text on Big Image
        //-------------------------------------------------

        const insertText = event => {
            let textBlock = bigImgHolder.textBlock;
            if (this.input.value.length > 0) {
                textBlock.innerText = this.input.value;
                textBlock.setAttribute('style', getAttrVal(this.outputText, 'style'));
            } else {
                this.errorText.innerText = 'Write what you want';
            }
        };
        this.button.addEventListener('click', insertText)
        //-------------------------------------------------

    }

    connectedCallback() {

    }

    setStyle() {
        this.shadowStyle.textContent = `
            
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