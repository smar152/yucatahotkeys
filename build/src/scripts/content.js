/**
 * This is the content script that will run in all yucata.de pages
 * Keys of the map are the buttons pressed
 * Values of the map are objects describing the action containing a description and a method
 */
import {machiKoroHotkeysMap, main as machi_koro_main} from './hotkeys/machi_koro';
import {globalHotkeysMap} from './hotkeys/global';
import {waitForBoardToExistAndThen} from "./dom";


/**
 * All of the hotkeys combined
 */
const hotkeysMap = {
  ...machiKoroHotkeysMap,
  ...globalHotkeysMap,
};

setupHotkeys();
waitForBoardToExistAndThen(addTooltip);
machi_koro_main();


/**
 * Add a tooltip to the UI containing the shortcuts
 */
function addTooltip(){
    const board = document.getElementById("board");
    const tooltipTriggerElement = Object.assign(document.createElement("div"), {
        className: "hotkeyTooltipTrigger ui-btn ui-input-btn ui-btn-a ui-corner-all ui-shadow ui-btn-inline ui-mini ui-first-child",
        textContent: "List of Hotkeys"
    });
    const tooltipText = Object.assign(document.createElement("div"), {
        className: "tooltipText",
    });

    Object.keys(hotkeysMap).forEach(key => {
       const {keyCombos, description} = hotkeysMap[key];
       const row = Object.assign(document.createElement("div"), {
           className: "tooltipTextRow"
       });
       const labelCell = Object.assign(document.createElement("div"), {
           className: "tooltipTextlabel",
           textContent: keyCombos[0].toLocaleUpperCase() + ":"
       });
       const valueCell = Object.assign(document.createElement("div"), {
           className: "tooltipTextValue",
           textContent: description
       });
       row.appendChild(labelCell);
       row.appendChild(valueCell);
       tooltipText.appendChild(row);
    });

    tooltipTriggerElement.appendChild(tooltipText);
    board.appendChild(tooltipTriggerElement);
    board.appendChild(tooltipText);
}


/**
 * Set up the keypress handlers for all the hotkeys
 */
function setupHotkeys(){
    console.log("Custom Yucata hotkeys added.");
    // For each key defined in the map (unique action name)
    Object.keys(hotkeysMap).forEach(actionId => {
        // Get the data object
        const data = hotkeysMap[actionId];
      
        if(data){
            const {keyCombos, method, description} = data;
            keyCombos.forEach(key => {
                const keyMethod = method;
                hotkeys(key, function(){ 
                    console.log(`Action: ${description}`);
                        keyMethod();
                });
            });        
        }
    });
}








