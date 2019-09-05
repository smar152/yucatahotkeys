import {getPopupButton} from "./dom.js";

init();

/**
 * Initialize this page
 */
function init() {
    // setupHandlers();
}

/**
 * Set up the handlers for UI elements
 */
function setupHandlers () {
    const button = getPopupButton();
    button.addEventListener("click", (e) => {
        window.alert("You clicked the button, good job");
    });
}