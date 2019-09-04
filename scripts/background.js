// in order to use import/export (ES6 modules) we are using this technique
// https://medium.com/front-end-weekly/es6-modules-in-chrome-extensions-an-introduction-313b3fce955b

import {getStoredValue, setStoredValue} from './library.js';

'use strict';

setStoredValue("color", "#123456", (value) => {
    console.log(`The color is ${value} when it was saved`);
});

getStoredValue("color", (value) => {
    console.log(`Stored value ${value}`, value);
});


