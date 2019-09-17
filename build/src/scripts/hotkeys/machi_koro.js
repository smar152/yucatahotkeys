import '../../scss/machi_koro.scss';
import {clickBySelector, waitForBoardToExistAndThen} from "../dom";
import hotkeys from 'hotkeys-js';

/**
 * Main method to be executed (by content.js)
 */
export function main(){
    waitForBoardToExistAndThen(()=> selectCardBySelector("#card1"));
    waitForBoardToExistAndThen(addCardTooltips);

    hotkeys('ctrl+a,ctrl+b,r,f', function (event, handler){
        switch (handler.key) {
          case 'ctrl+a': alert('you pressed ctrl+a!');
            break;
          case 'ctrl+b': alert('you pressed ctrl+b!');
            break;
          case 'r': alert('you pressed r!');
            break;
          case 'f': alert('you pressed f!');
            break;
          default: alert(event);
        }
      });
}


/**
 * Hotkey map for machi koro only
 */
export const machiKoroHotkeysMap = {
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
        keyCombos: ["left"],
        description: "Select Left Card",
        method: () => selectCardLeft()
    },
    "machi_koro_select_card_right": {
        keyCombos: ["right"],
        description: "Select Right Card",
        method: () => selectCardRight()
    },
    "machi_koro_select_card_up": {
        keyCombos: ["up"],
        description: "Select Top Card",
        method: () => selectCardUp()
    },
    "machi_koro_select_card_down": {
        keyCombos: ["down"],
        description: "Select Bottom Card",
        method: () => selectCardDown()
    },
    "machi_koro_buy_selected_card": {
        keyCombos: ["b"],
        description: "Buy Selected Card",
        method: () => buySelectedCard()
    }
};

/**
 * Add the "selectedCard" class to the element matched by the selector (if any)
 * @param {string} selector
 */
export function selectCardBySelector(selector){
    const activeElement = getSelectedCard();
    const cardElement = document.querySelector(selector);
    if(cardElement){
        cardElement.classList.add("selectedCard");
        if(activeElement){
            activeElement.classList.remove( "selectedCard" );
        }
    }
}

/**
 * Adds card tooltips on hover (zoomed in cards)
 */
function addCardTooltips() {
    const cards = getCardsDom();
    cards.forEach(card => {
        const clone = card.querySelector(".card img").cloneNode();
        clone.classList.add("cardZoomed");
        card.parentElement.insertBefore(clone, card.nextSibling);
    })
}

/**
 *
 * @returns {NodeListOf<Element>}
 */
function getCardsDom() {
    return [...document.querySelectorAll(".cardContainer")];
}

/**
 * Return the card that is currently selected (has the class selectedCard)
 * @returns {Element}
 */
export function getSelectedCard(){
    return document.querySelector( ".selectedCard");
}

/**
 * Select a card based on the number provided
 * @param {number} cardNumber
 */
export function selectCardByNumber(cardNumber){
    const nextCardSelector = `#card${cardNumber}`;
    selectCardBySelector(nextCardSelector);
}

/**
 * Return the card number for the provided element
 * @param {Element} element
 * @returns {number}
 */
export function getCardNumber(element){
    const regex = /\d+$/;
    if(element){
        const cardNumber = element.id.match(regex)[0];
        try{
            return parseInt(cardNumber);
        } catch(error){
            console.log(`${element.id} did not have a number at the end of its ID`);
            return null;
        }
    }
    return null;
}

/**
 * Select the card to the left of the active card
 */
export function selectCardLeft(){
    const activeElement = getSelectedCard();
    const nextCardNumber = getCardNumber(activeElement) - 1;

    selectCardByNumber(nextCardNumber);
}

/**
 * Select the card to the right of the active card
 */
export function selectCardRight(){
    const activeElement = getSelectedCard();
    const nextCardNumber = getCardNumber(activeElement) + 1;

    selectCardByNumber(nextCardNumber);
}

/**
 * Select the card to the up of the active card
 */
export function selectCardUp(){
    const activeElement = getSelectedCard();
    const nextCardNumber = getCardNumber(activeElement) - 5;

    selectCardByNumber(nextCardNumber);
}

/**
 * Select the card to the down of the active card
 */
export function selectCardDown(){
    const activeElement = getSelectedCard();
    const nextCardNumber = getCardNumber(activeElement) + 5;

    selectCardByNumber(nextCardNumber);
}

/**
 * Buy the card that is currently selected
 */
export function buySelectedCard(){
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
            // An den einai available auth
            // An den einai h seira sou -- auto isws to lynoyme me to na tsekaroume seira apo prin
            console.log("Doesn't seem to be available though.");
            const undoButton = document.querySelector("#btn_undo");
            if (undoButton){
                // An exeis agorasei hdh
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