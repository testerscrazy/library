import { expect, test } from "playwright/test";
import { LoginPage } from "../../pages/loginPage";
const { chromium } = require('playwright-core');

let browser;
let loginPage: LoginPage;


test.beforeAll(async() =>{
    // Initialize browser
    browser = await chromium.launch();
})


test.beforeEach(async({page})=>{
    // go to base url
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
})


test("As a Student I verify that the Practice login page exist", async ({ page }) => {

    loginPage = new LoginPage(page);
    await expect(page.url()).toEqual(process.env.library_url);

})

