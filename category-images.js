class posterCategories extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow ({ mode: 'open'});
        this.posters = this.shadow.appendChild (
            document.createElement ( "div" )
        );
        let _this = this;
        let btnNames = ['nature', 'fruit', 'sport'];
        for (let item of btnNames) {
            let btn = document.createElement ("button");
            btn.innerText = item;
            document.body.onload = function ( event ) {
                this.setAttribute('src', `${btnNames[0]}.json` )
            }.bind(_this);
            btn.onclick = function ( event ) {
                this.setAttribute('src', `${event.target.innerText}.json` )
                // btn.classList.toggle('active')
            }.bind (this);
            this.shadow.appendChild(btn);
            console.log(btn.parentNode)
        }

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

        this.onclick = function(event) {
            var target = event.target;
            console.log(target)

            while (target != this) {
                if (target.tagName == 'BUTTON') {
                    highlight(target);
                    return;
                }
                target = target.parentNode;
            }
        }

        function highlight(node) {
            let selectedTd;
            if (selectedTd) {
                selectedTd.classList.remove('highlight');
            }
            selectedTd = node;
            selectedTd.classList.add('highlight');
        }
    };




    setStyle () {
        this.shadowStyle.textContent = `
          div {
            position: absolute;
            top: 50px;
            overflow: auto;
          }
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






// let filterGallery = addElement('section');
// let filter = addElement('div', filterGallery);
// filter.className = "filter-holder";
// let filterButton;
//
// function addElement(childElem, parentElem) {
//     return (parentElem ? parentElem : document.body).appendChild(
//         document.createElement(childElem)
//     )
// }
//
// let getData = function (ref) {
//     return fetch('http://localhost:3000/' + ref)
//         .then(response => response.json())
// };
//
// let createButtons = function () {
//     new Promise (
//         resolve => {
//             getData('categories').then(data => {
//                 data.forEach(
//                     item => {
//                         filterButton = addElement('button', filter);
//                         filterButton.innerText = item;
//                     }
//                 )
//             })
//         }
//
//     )
// };
//
// createButtons();
