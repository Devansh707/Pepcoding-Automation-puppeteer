// npm i puppeteer
let puppeteer = require('puppeteer');
// creates headless browser and gives us the new headless browser
let browserStackPromise = puppeteer.launch({
    // visible
    headless: false,
    // type 1sec
    // slowMo : 100,

    defaultViewport: null,
    // setting
    args: ["--start-maximized", "--disable-notifications"]

});
let page, browser, rTab;
browserStackPromise
    .then(function (browserObj) {
        console.log("Browser Opened");
        let browserTabOpenPromise = browserObj.newPage();// creates new tab
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("New tab opened");
        let gPageOpenPromise = newTab.goto("https://www.google.com/");
        return gPageOpenPromise;
    }).then(function () {
        console.log("Google Home page opened");
        // keyboard -> data entry
        let waitForTypingPromise = page.type("input[title = 'Search']", "pepcoding");
        return waitForTypingPromise;
    }).then(function () {
        // keyboard specific keys should
        let enterWillBeDonePromise = page.keyboard.press('Enter', { delay: 1000 });
        return enterWillBeDonePromise;
    }).then(function () {
        //wait for element to be visible whenever you go to a new Page
        console.log("wait for element to be visible");
        let waitForElementPromise = waitAndClick(".LC20lb.DKV0Md", page);
        return waitForElementPromise;
    }).then(function () {
        let wcPromise = handleIfFileNotPresent("#lp_modal_close", page);
        console.log("wcPromise", wcPromise);
        return wcPromise;
    })
    .then(function () {
        // page element -> cheerio
        let allLisPromise = page.$$(".site-nav-li");
        return allLisPromise;
    })
    .then(function (allElem) {
        // Nados
        let elementWillBeclickedPromise = allElem[7].click({ delay: 100 });//doubt in allElem
        return elementWillBeclickedPromise;
    })
    // resources page is on next tab and next tab will take some time
    .then(function () {
        let future2secondAfter = Date.now() + 2000;
        while (Date.now() < future2secondAfter) {

        }
        let listOfOpenedTabsPromise = browser.pages();
        return listOfOpenedTabsPromise;
    })
    .then(function (array) {
        rTab = array[array.length - 1];
        let waitforLevel1Promise = waitAndClick('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]', rTab);
        return waitforLevel1Promise;
    }).then(function () {
        console.log("level 1 opened");
    })
// user defined promise based function -> it will return 
//  a promise that will be resolved when the user has waited for element to appear as well as we have clicked on it 
function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise
            .then(function () {
                let clickModal = cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    }
    )
}
// promise -> banner however is present or not -> the code will run
function handleIfFileNotPresent(selector, cPage) {
    return new Promise(function (resolve, reject) {
        // wait clickModal
        let waitAndClickPromise = waitAndClick(selector, cPage);
        waitAndClickPromise.then(function () {
            resolve();
        })
        waitAndClickPromise.catch(function (err) {
            resolve();
        })
    })
}
















