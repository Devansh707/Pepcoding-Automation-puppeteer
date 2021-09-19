let puppeteer = require('puppeteer');
let browserStackPromise = puppeteer.launch({
    headless: false,
    // slowMo : 1000,
    defaultViewport: null,
    args: ["--start-maximized", "--disable-notifications"],
});
let page, browser, rtab;
browserStackPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        browser = browserObj;
        let nTab = browserObj.newPage();
        return nTab;
    }).then(function (googlepage) {
        // page = browserObj.pages[0];
        page = googlepage;
        console.log("new tab opened");
        let gPage = googlepage.goto("https://www.google.com/");
        // browserObj.close();
        return gPage;
    }).then(function () {
        console.log("new google opened");
        let pepcondingtype = page.type("input[name='q']", "pepcoding", {delay: 100});// keyboard entry
        return pepcondingtype;
    }).then(function () {
        let enterPressedpromise = page.keyboard.press('Enter'); // press specific keys in keyboard
        return enterPressedpromise;
    }).then(function () {
        console.log("wait for element to be present");
        let waitforpep = page.waitForSelector(".LC20lb.DKV0Md", {visible: true});
        return waitforpep;
    }).then(function () {
        let pepopen = page.click(".LC20lb.DKV0Md");
        return pepopen;
    }).then(function () {
        let waitforallelements = page.waitForSelector(".site-nav-li");
        return waitforallelements;
    }).then(function (){
        let listofelements = page.$$(".site-nav-li");
        return listofelements;
    }).then(function (allements) {
        let resource = allements[10].click({delay : 1000});
        return resource;
    }).then(function(){
        let waitforalltabs = page.waitFor(2000);
        return waitforalltabs;
    })
    .then(function () {
        console.log("opened resource page");
        let listofopenedtabs = browser.pages();
        return listofopenedtabs;
    }).then(function (array) {
        rtab = array[array.length - 1];
        let dsa = rtab.waitForSelector('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]', {visible: true});
        return dsa;
    }).then(function () {
        let dsaclicked = rtab.click('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]', {delay : 1000});
        return dsaclicked;
    }).then(function () {
        console.log("level 1 opened");
    })