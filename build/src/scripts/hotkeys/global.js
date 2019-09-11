import {clickBySelector} from "../dom";

/**
 * Hotkey map for all games
 */
export const globalHotkeysMap = {
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
