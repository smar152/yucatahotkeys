/**
 * Return the dom node of the button in the popup
 * @returns {HTMLElement}
 */
export const getPopupButton = () =>{
    return document.getElementById("popupButton");
};

/**
 * Click the element in the selector if it is found
 * @param {string} selector
 */
export function clickBySelector(selector){
    const element = document.querySelector(selector);
    if(element){
        element.click();
    } else {
        console.log(`Element ${selector} not found`);
    }
}

/**
 * Wait for the board DOM element to exist, and then execute the method passed
 * @param {function} method
 */
export function waitForBoardToExistAndThen(method){
    const board = document.getElementById("board");
    if(board){
        console.log("Board is ready.");
        method();
    } else {
        console.log("No board yet, waiting.");
        setTimeout(waitForBoardToExistAndThen.bind(this, method), 500);
    }
}
