// let customEvent = function (obj) {
//     var obj = {
//         detail: typeof obj === "object" ? obj : {}
//     };
//     return new CustomEvent('showBigImg', obj);
// }
//
// function getAttrSrc(el) {
//     let attr = el.getAttribute('src');
//     return attr;
// }

let testEventName = 'speak'


let smallImgHolder = document.querySelector('category-images');
let bigImgHolder = document.querySelector('big-image');

let shadowroot = smallImgHolder.shadowRoot
console.log(shadowroot)

// console.log(smallImgHolder.childNodes)

// bigImgHolder.addEventListener('speak', function (event) {
//     console.log(this)
//     this.innerText = "I'm speaking now"
// });
//
// smallImgHolder.onclick = function (event) {
//     console.log(1)
//     bigImgHolder.dispatchEvent(new Event('speak'))
// }





















































// class EventEmitter {
//     constructor() {
//         this.events = {};
//     }
//
//     emit(eventName, data) {
//         const event = this.events[eventName];
//         if( event ) {
//             event.forEach(fn => {
//                 fn.call(null, data);
//             });
//         }
//     }
//
//     subscribe(eventName, fn) {
//         if(!this.events[eventName]) {
//             this.events[eventName] = [];
//         }
//
//         this.events[eventName].push(fn);
//         return () => {
//             this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
//         }
//     }
//
//
// }
//
// document.addEventListener("DOMContentLoaded", function(event) {
//     let input = document.querySelector('input[type="text"]');
//     let button = document.querySelector('button');
//     let h1 = document.querySelector('h1');
//
//     button.addEventListener('click', () => {
//         emitter.emit('event:name-changed', {name: input.value});
//     });
//
//     let emitter = new EventEmitter();
//     emitter.subscribe('event:name-changed', data => {
//         h1.innerHTML = `Your name is: ${data.name}`;
//     });
//
// });
