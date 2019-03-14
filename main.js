class posterCatagories extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow ({ mode: 'open'});
        this.posters = this.shadow.appendChild (
            document.createElement ( "section" )
        );

        for ( let item of ['nature', 'fruit', 'sport']) {
            let btn = document.createElement ("button");
            btn.innerText = item
            btn.onclick = function ( event ) {
                this.setAttribute ('src', `${event.target.innerText}.json` )
            }.bind (this);
            this.shadow.appendChild(btn);
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

    attributeChangedCallback(attrName, prevVal, newVal) {
        this.posters.innerHTML = "";
        this.readJSON ();
    };

    setStyle () {
        this.shadowStyle.textContent = `
          section {
            position: absolute;
            top: 50px;
            overflow: auto;
          }
          button {
            padding: 5px 10px;
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
                        resolve (img)
                    };
                    img.onerror = () => reject ( pictureURL );
                    img.src = pictureURL
                }
            );
        let pictures = await fetch (url)
        .then (response => response.json());
        promises = pictures.map (
            imgURL => promise (imgURL)
        );

        let images = await Promise.all(promises);
        images.forEach (
            item => this.posters.appendChild (item)
        )
    }
}

customElements.define('category-images', posterCatagories);



















































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
