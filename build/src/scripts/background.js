// in order to use import/export (ES6 modules) we are using this technique
// https://medium.com/front-end-weekly/es6-modules-in-chrome-extensions-an-introduction-313b3fce955b

import {addOnInstalledListener, getStoredValue, setStoredValue} from './library.js';

'use strict';

addOnInstalledListener(() => {
    handleOnPageChanged();

    setStoredValue("color", "#123456", (value) => {
        console.log(`The color is ${value} when it was saved`);
    });

    getStoredValue("color", (value) => {
        console.log(`Stored value ${value}`, value);
    });
});

/**
 * Setup handler that runs when the page changes
 * e.g. to enable/disable the page action
 */
function handleOnPageChanged(){
    // Add handler that makes this work only on yucata
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'yucata.de'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
}


