/**
 * Set a value in Chrome storage
 * See https://developer.chrome.com/apps/storage
 * @param key
 * @param value
 * @param {function} callback
 */
export const setStoredValue = (key, value, callback) => {
    chrome.storage.sync.set({[key]: value}, function() {
        callback(value);
    });
};


/**
 * Set a value in Chrome storage
 * See https://developer.chrome.com/apps/storage
 * @param key
 * @param {function} callback
 */
export const getStoredValue = (key, callback) => {
    chrome.storage.sync.get([key], function(value) {
        callback(value[key]);
    });
};


/**
 * Add an on Installed handler
 * @param {function} method
 */
export const addOnInstalledListener = (method) => {
    chrome.runtime.onInstalled.addListener(() => {
        method();
    });
};