class PosterCategories extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow ({ mode: 'open'});
        this.btnHolder = this.shadow.appendChild(
            document.createElement("div")
        );
        this.btnHolder.className = 'btn-holder';
        this.posters = this.shadow.appendChild (
            document.createElement ( "div" )
        );
        this.posters.className = 'img-holder';
        this.bigImgHolder = document.querySelector('big-image');
        let btnNames = ['nature', 'fruit', 'sport'];
        this.setAttribute('src', `${btnNames[0]}.json`);

        for (let item of btnNames) {
            let btn = document.createElement ("button");
            btn.innerText = item;
            btn.classList.add('btn');
            btn.onclick = function(event) {
                this.setAttribute('src', `${event.target.innerText}.json`)
            }.bind(this);
            this.btnHolder.appendChild(btn);
        }

        let btns = this.btnHolder.childNodes;
        btns[0].classList.add('active');

        this.btnHolder.onclick = function(event) {
            let target = event.target;
            if (!target.classList.contains('btn')) return;

            btns.forEach(function(item) {
                item.classList.remove('active');
            });

            target.classList.add('active');
        };

        this.shadowStyle = this.shadow.appendChild (
            document.createElement ('style')
        );

        this.shadowStyle.textConsetStyletent = ``;
        this.setStyle();
        this.readJSON();

    };

    static get observedAttributes() {
        return['src']
    };

    attributeChangedCallback(name, oldVal, newVal) {
        this.posters.innerHTML = "";
        this.readJSON();
    };

    connectedCallback() {
        // let imageSrc;
        //
        // this.bigImgHolder.addEventListener('showBigImg', function () {
        //     this.img.setAttribute('src', imageSrc);
        // });
        //
        // this.posters.onclick = function (event) {
        //     let target = event.target;
        //     imageSrc = getAttrSrc(target);
        //     bigImgHolder.dispatchEvent(new Event('showBigImg'))
        // }

        this.posters.onclick = event => {
            let target = event.target;
            bigImgHolder.img.setAttribute('src', getAttrVal(target, 'src'));
        }
    }

    setStyle() {
        this.shadowStyle.textContent = `
        /*@import "https://codepen.io/chriscoyier/pen/VqKvZr.css";*/
        
          .btn {
            padding: 5px 10px;
          }
          
          .btn.active {
            color: red;
          }
        `
    }

    async readJSON() {
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

customElements.define('category-images', PosterCategories);
