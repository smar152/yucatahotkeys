/**
 * This is the content script that will run in all yucata.de pages
 * Keys of the map are the buttons pressed
 * Values of the map are objects describing the action containing a description and a method
 */
const globalHotkeysMap = {
    "g": {
        description: "Hit 'OK' when it's your turn",
        method: () => clickBySelector(".ui-popup-active input[value='OK']")
    },
    "u": {
        description: "Hit 'Undo' button",
        method: () => clickBySelector("#btn_undo")
    },
    "p": {
        description: "Hit the 'Pass' button",
        method: () => clickBySelector("#btn_BtnPassBuy")
    },
    "f": {
        description: "Hit the 'Finish Turn' button",
        method: () => clickBySelector("#btn_finishTurn")
    },
    "n": {
        description: "Hit the 'Next Game' button",
        method: () => clickBySelector("#btn_nextGame")
    }
};

/**
 * Hotkey map for machi koro only
 */
const machiKoroHotkeysMap = {
    "1": {
        description: "Buy Card in Slot 1 (Machi Koro)",
        method: () => clickBySelector("#card1")
    },
    "2": {
        description: "Buy Card in Slot 2 (Machi Koro)",
        method: () => clickBySelector("#card2")
    },
    "3": {
        description: "Buy Card in Slot 3 (Machi Koro)",
        method: () => clickBySelector("#card3")
    },
    "4": {
        description: "Buy Card in Slot 4 (Machi Koro)",
        method: () => clickBySelector("#card4")
    },
    "5": {
        description: "Buy Card in Slot 5 (Machi Koro)",
        method: () => clickBySelector("#card5")
    },
    "6": {
        description: "Buy Card in Slot 6 (Machi Koro)",
        method: () => clickBySelector("#card6")
    },
    "7": {
        description: "Buy Card in Slot 7 (Machi Koro)",
        method: () => clickBySelector("#card7")
    },
    "8": {
        description: "Buy Card in Slot 8 (Machi Koro)",
        method: () => clickBySelector("#card8")
    },
    "9": {
        description: "Buy Card in Slot 9 (Machi Koro)",
        method: () => clickBySelector("#card9")
    },
    "d": {
        description: "Toggle Dice",
        method: () => clickBySelector("#die2")
    },
    "r": {
        description: "Hit 'Roll dice' button",
        method: () => clickBySelector("#btn_Würfeln")
    },
    "q": {
        description: "Hit 'Reroll dice' button",
        method: () => clickBySelector("#btn_BtnRollAgain")
    },
    "w": {
        description: "Hit 'Do Not Reroll' button",
        method: () => clickBySelector("#btn_BtnRollNotAgain")
    },
    "ArrowLeft": {
        description: "Select Left Card",
        method: () => selectCardLeft()
    },
    "ArrowRight": {
        description: "Select Right Card",
        method: () => selectCardRight()
    },
    "ArrowUp": {
        description: "Select Top Card",
        method: () => selectCardUp()
    },
    "ArrowDown": {
        description: "Select Bottom Card",
        method: () => selectCardDown()
    },
    "Enter": {
        description: "Buy Selected Card",
        method: () => buySelectedCard()
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
waitForBoardToExistAndThen( ()=> makeActiveBySelector("#card1"));

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
    // For each key defined in the map (what is pressed on the keyboard)
    Object.keys(hotkeysMap).forEach(key => {
        // Attach an keypress event listener to the window object
        window.addEventListener("keydown", (e) => {
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

function makeActiveBySelector(selector){
    const element = document.querySelector(selector);
    if(element){
        const activeElement = document.querySelector( ".selectedCard");
        // if(activeElement){
        //     activeElement.classList.remove( "selectedCard" );
        // }
        element.classList.add("selectedCard");
    } else {
        console.log(`Element ${selector} not found`);
    }
}

function selectCardRight(){
    const activeElement = document.querySelector( ".selectedCard");
    const regex = /\d+$/;
    const cardNumber = activeElement.id.match(regex)[0];
    const nextCardNumber = parseInt(cardNumber) + 1;

    const nextCardDom = document.querySelector(`#card${nextCardNumber}`);
    console.log(nextCardDom);
    if(nextCardDom){
        const nextCardId = "#card" + nextCardNumber;
        activeElement.classList.remove( "selectedCard" );
        document.querySelector(nextCardId).classList.add("selectedCard");
        console.log(nextCardNumber);
        console.log(nextCardId);
    }
    console.log(cardNumber);
}

function selectCardLeft(){
    const activeElement = document.querySelector( ".selectedCard");
    const regex = /\d+$/;
    const cardNumber = activeElement.id.match(regex)[0];
    const nextCardNumber = parseInt(cardNumber) - 1;

    const nextCardDom = document.querySelector(`#card${nextCardNumber}`);
    console.log(nextCardDom);
    if(nextCardDom){
        const nextCardId = "#card" + nextCardNumber;
        activeElement.classList.remove( "selectedCard" );
        document.querySelector(nextCardId).classList.add("selectedCard");
        console.log(nextCardNumber);
        console.log(nextCardId);
    }
    console.log(cardNumber);
}

function selectCardDown(){
    const activeElement = document.querySelector( ".selectedCard");
    const regex = /\d+$/;
    const cardNumber = activeElement.id.match(regex)[0];
    const nextCardNumber = parseInt(cardNumber) + 5;

    const nextCardDom = document.querySelector(`#card${nextCardNumber}`);
    console.log(nextCardDom);
    if(nextCardDom){
        const nextCardId = "#card" + nextCardNumber;
        activeElement.classList.remove( "selectedCard" );
        document.querySelector(nextCardId).classList.add("selectedCard");
        console.log(nextCardNumber);
        console.log(nextCardId);
    }
    console.log(cardNumber);
}

function selectCardUp(){
    const activeElement = document.querySelector( ".selectedCard");
    const regex = /\d+$/;
    const cardNumber = activeElement.id.match(regex)[0];
    const nextCardNumber = parseInt(cardNumber) - 5;

    const nextCardDom = document.querySelector(`#card${nextCardNumber}`);
    console.log(nextCardDom);
    if(nextCardDom){
        const nextCardId = "#card" + nextCardNumber;
        activeElement.classList.remove( "selectedCard" );
        document.querySelector(nextCardId).classList.add("selectedCard");
        console.log(nextCardNumber);
        console.log(nextCardId);
    }
    console.log(cardNumber);
}

function buySelectedCard(){
    const activeElement = document.querySelector( ".selectedCard");
    console.log("Ok I want to buy " + activeElement.id);
    if(activeElement){
        if (activeElement.classList.contains("active"))
        {
            console.log("It's active, sure, I'll buy it");
            activeElement.click();
            console.log("Click");
        }
        else{
            // auto bvgainei an
            // 1. den einai available auth
            // 2. exeis agorasei hdh  ** αν υπαρχει κουμπί αντού "#btn_undo"
            // 3. den einai h seira sou -- auto isws to lynoyme me to na tsekaroume seira apo prin
            console.log("Doesn't seem to be available though.");
            const undoButton = document.querySelector("#btn_undo");
            if (undoButton){
                alert("You've already chosen a card.");
                // an vgaloume to ble otan den einai h seira sou de xreiazetai auto
                // alla prepei na xanaginetai ble otan einai h seira sou
            }
            else{
                alert("You can't buy this one :( \nChose an available card.");
            }
        }        
    } else {
        console.log(`Element ${activeElement.id} not found`);
    }
}
