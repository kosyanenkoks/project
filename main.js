let filterGallery = addElement('section');
let filter = addElement('div', filterGallery);
filter.className = "filter-holder";
let filterButton;

function addElement(childElem, parentElem) {
    return (parentElem ? parentElem : document.body).appendChild(
        document.createElement(childElem)
    )
}

let getData = function (ref) {
    return fetch('http://localhost:3000/' + ref)
        .then(response => response.json())
};

let createButtons = function () {
    new Promise (
        resolve => {
            getData('categories').then(data => {
                data.forEach(
                    item => {
                        filterButton = addElement('button', filter);
                        filterButton.innerText = item;
                    }
                )
            })
        }

    )
};

createButtons();
