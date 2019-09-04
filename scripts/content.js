/**
 * This is the content script that will run in all yucata.de pages
 */

setupHotkeys();

/**
 * Set up the keypress handlers for all the hotkeys
 */
function setupHotkeys(){
    console.log("I set up hotkeys!");
    // Info on hotkeys https://developer.chrome.com/extensions/commands
    // document.body.onkeypress = (e) => {
    //     if(e.key === "a"){
    //         console.log("You clicked A!");
    //         document.getElementById("btn_finishTurn").click();
    //     }
    //
    // }
}