class posterCategories extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow ({ mode: 'open'});
        this.posters = this.shadow.appendChild (
            document.createElement ( "div" )
        );
        this.btnHolder = this.shadow.appendChild(
                document.createElement("div")
        );
        this.btnHolder.className = 'btn-holder';
        let activeBtn;
        let btnNames = ['nature', 'fruit', 'sport'];

        for (let item of btnNames) {
            let btn = document.createElement ("button");
            btn.innerText = item;
            this.setAttribute('src', `${btnNames[0]}.json`);

            if (item === 'nature') {
                btn.classList.add('active');
            }

            btn.onclick = function ( event ) {
                this.setAttribute('src', `${event.target.innerText}.json` )
            }.bind(this);

            this.btnHolder.appendChild(btn);
        }

        //----------------------------------------------

        this.btnHolder.onclick = function(event) {
            var target = event.target;

            while (target != this) {
                if (target.tagName == 'BUTTON') {
                    highlight(target);
                    return;
                }
                target = target.parentNode;
            }
        };

        function highlight(node) {
            if (activeBtn) {
                activeBtn.classList.remove('active');
            }
            activeBtn = node;
            activeBtn.classList.add('active');
        }
        //----------------------------------------------

        this.shadowStyle = this.shadow.appendChild (
            document.createElement ('style')
        );

        this.shadowStyle.textContent = ``;
        this.setStyle ();
        this.readJSON ();
    };

    static get observedAttributes() {
        return ['src']
    };

    attributeChangedCallback() {
        this.posters.innerHTML = "";
        this.readJSON ();
    };

    setStyle () {
        this.shadowStyle.textContent = `
          // div:first-child {
          //   position: absolute;
          //   top: 50px;
          //   overflow: auto;
          // }
          
          button {
            padding: 5px 10px;
          }
          
          button.active {
            color: red;
          }
        `
    }

    async readJSON () {
        let url = this.getAttribute ('src');
        if (!url) return null;
        let promises = [];
        let promise = pictureURL =>
            new Promise (
                (resolve, reject) => {
                    let img = document.createElement ('img');
                    img.onload = function () {
                        resolve (img);
                    };
                    img.onerror = () => reject (pictureURL);
                    img.src = pictureURL;
                }
            );
        let pictures = await fetch (url)
            .then (response => response.json());
        promises = pictures.map (
            imgURL => promise(imgURL)
        );

        let images = await Promise.all(promises);
        images.forEach (
            item => this.posters.appendChild (item)
        )
    }
}

customElements.define('category-images', posterCategories);
