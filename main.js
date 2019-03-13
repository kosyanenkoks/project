function addElement(childElem, parentElem) {
    return (parentElem ? parentElem : document.body).appendChild(
        document.createElement(childElem)
    )
}

let filterGallery = addElement('section');
let filter = addElement('div', filterGallery);
filter.className = "filter-holder";
let filterButton;

let categoryContent = 'categorys.json';


function test (url) {
     fetch(url)
        .then(response => response.json()
             .then(response => {
                 response.forEach(
                     item => {
                         filterButton = addElement('button', filter);
                         filterButton.innerText = item;
                     }
                 )
             }))
};

test(categoryContent);