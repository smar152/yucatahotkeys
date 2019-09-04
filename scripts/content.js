/**
 * This is the content script that will run in all yucata.de pages
 */

const hotkeysMap = {
    "a": {
        description: "Hit the 'Finish Turn' button",
        method: () => clickBySelector("#btn_finishTurn")
    }
};

setupHotkeys();


/**
 * Set up the keypress handlers for all the hotkeys
 */
function setupHotkeys(){
    console.log("I set up ze hotkeys!");

    Object.keys(hotkeysMap).forEach(key => {
        window.addEventListener("keypress", (e) => {
            // If the key in the event matches the key we are setting up the handler for
            if(e.key === key){
                const data = hotkeysMap[key];
                // If we have a binding for this hotkey
                if(data){
                    const {description, method} = data;
                    console.log(`Action: ${description}`);
                    method();
                }
            }
        });
    });
}

/**
 * Click the element in the selector if it is found
 * @param {string} selector
 */
function clickBySelector(selector){
    const element = document.querySelector(selector);
    if(element){
        element.click();
    } else {
        console.log(`Element ${selector} not found`);
    }
}