/**
 * This is the content script that will run in all yucata.de pages
 * Keys of the map are the buttons pressed
 * Values of the map are objects describing the action containing a description and a method
 */
const globalHotkeysMap = {
    "global_ok": {
        keyCombos: ["g"],
        description: "Hit 'OK' when it's your turn",
        method: () => clickBySelector(".ui-popup-active input[value='OK']")
    },
    "global_undo": {
        keyCombos: ["u"],
        description: "Hit 'Undo' button",
        method: () => clickBySelector("#btn_undo")
    },
    "global_pass": {
        keyCombos: ["p"],
        description: "Hit the 'Pass' button",
        method: () => clickBySelector("#btn_BtnPassBuy")
    },
    "global_finish": {
        keyCombos: ["f"],
        description: "Hit the 'Finish Turn' button",
        method: () => clickBySelector("#btn_finishTurn")
    },
    "global_next_game": {
        keyCombos: ["n"],
        description: "Hit the 'Next Game' button",
        method: () => clickBySelector("#btn_nextGame")
    }
};

/**
 * Hotkey map for machi koro only
 */
const machiKoroHotkeysMap = {
    "machi_koro_buy_slot_1": {
        keyCombos: ["1"],
        description: "Buy Card in Slot 1 (Machi Koro)",
        method: () => clickBySelector("#card1")
    },
    "machi_koro_buy_slot_2": {
        keyCombos: ["2"],
        description: "Buy Card in Slot 2 (Machi Koro)",
        method: () => clickBySelector("#card2")
    },
    "machi_koro_buy_slot_3": {
        keyCombos: ["3"],
        description: "Buy Card in Slot 3 (Machi Koro)",
        method: () => clickBySelector("#card3")
    },
    "machi_koro_buy_slot_4": {
        keyCombos: ["4"],
        description: "Buy Card in Slot 4 (Machi Koro)",
        method: () => clickBySelector("#card4")
    },
    "machi_koro_buy_slot_5": {
        keyCombos: ["5"],
        description: "Buy Card in Slot 5 (Machi Koro)",
        method: () => clickBySelector("#card5")
    },
    "machi_koro_buy_slot_6": {
        keyCombos: ["6"],
        description: "Buy Card in Slot 6 (Machi Koro)",
        method: () => clickBySelector("#card6")
    },
    "machi_koro_buy_slot_7": {
        keyCombos: ["7"],
        description: "Buy Card in Slot 7 (Machi Koro)",
        method: () => clickBySelector("#card7")
    },
    "machi_koro_buy_slot_8": {
        keyCombos: ["8"],
        description: "Buy Card in Slot 8 (Machi Koro)",
        method: () => clickBySelector("#card8")
    },
    "machi_koro_buy_slot_9": {
        keyCombos: ["9"],
        description: "Buy Card in Slot 9 (Machi Koro)",
        method: () => clickBySelector("#card9")
    },
    "machi_koro_toggle_dice": {
        keyCombos: ["d"],
        description: "Toggle Dice",
        method: () => clickBySelector("#die2")
    },
    "machi_koro_roll_dice": {
        keyCombos: ["r"],
        description: "Hit 'Roll dice' button",
        method: () => clickBySelector("#btn_Würfeln")
    },
    "machi_koro_reroll_dice": {
        keyCombos: ["q"],
        description: "Hit 'Reroll dice' button",
        method: () => clickBySelector("#btn_BtnRollAgain")
    },
    "machi_koro_do_not_reroll_dice": {
        keyCombos: ["w"],
        description: "Hit 'Do Not Reroll' button",
        method: () => clickBySelector("#btn_BtnRollNotAgain")
    },
    "machi_koro_select_card_left": {
        keyCombos: ["ArrowLeft"],
        description: "Select Left Card",
        method: () => selectNextCard()
    },
    "machi_koro_select_card_right": {
        keyCombos: ["ArrowRight"],
        description: "Select Right Card",
        method: () => selectNextCard()
    },
    "machi_koro_select_card_up": {
        keyCombos: ["ArrowUp"],
        description: "Select Top Card",
        method: () => selectNextCard()
    },
    "machi_koro_select_card_down": {
        keyCombos: ["ArrowDown"],
        description: "Select Bottom Card",
        method: () => selectNextCard()
    }
};

/**
 * All of the hotkeys combined
 */
const hotkeysMap = {
  ...machiKoroHotkeysMap,
  ...globalHotkeysMap,
};

setupHotkeys();
waitForBoardToExistAndThen(addTooltip);
waitForBoardToExistAndThen(()=> makeActiveBySelector("#card1"));

/**
 * Wait for the board DOM element to exist, and then execute the method passed
 * @param {function} method
 */
function waitForBoardToExistAndThen(method){
    const board = document.getElementById("board");
    if(board){
        console.log("Board is ready.");
        method();
    } else {
        console.log("No board yet, waiting.");
        setTimeout(waitForBoardToExistAndThen.bind(this, method), 500);
    }
}

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
       const {description} = hotkeysMap[key];
       const row = Object.assign(document.createElement("div"), {
           className: "tooltipTextRow"
       });
       const labelCell = Object.assign(document.createElement("div"), {
           className: "tooltipTextlabel",
           textContent: key.toLocaleUpperCase() + ":"
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
                // Attach an keypress event listener to the window object
                window.addEventListener("keydown", (e) => {
                    // If the key in the event matches the key we are setting up the handler for
                    if(e.key === key){
                        // If we have a binding for this hotkey
                        console.log(`Action: ${description}`);
                        method();
                    }
                });
            });
        }
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

/**
 * Add the "selectedCard" class to the element matched by the selector (if any)
 * @param {string} selector
 */
function makeActiveBySelector(selector){
    const element = document.querySelector(selector);
    if(element){
        element.classList.add("selectedCard");
        const activeElement = document.querySelector( ".selectedCard");
        if(activeElement){
            activeElement.classList.remove("selectedCard" );
        }
    } else {
        console.log(`Element ${selector} not found`);
    }
}

function selectNextCard(){
    makeActiveBySelector("#card1");
    /*const element = document.querySelector(selector);
    if(element){
        element.click();
    } else {
        console.log(`Element ${selector} not found`);
    }*/
}



