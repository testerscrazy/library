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


test("As a Student I verify that the library login page exist", async ({ page }) => {

    loginPage = new LoginPage(page);
    await expect(page.url()).toEqual(process.env.LIBRARY_URL+"/login.html");

})

test("As a Student when I login to library page with valid username and password and verify that I'm at library page ", async ({ page }) => {
  
    loginPage = new LoginPage(page);
    await loginPage.login(process.env.STUDENT_USERNAME || '', process.env.STUDENT_PASSWORD || '');
    await expect(page.url()).toEqual(process.env.LIBRARY_URL+"/login.html");
})

test.afterEach(async ({ page }) => {
    await page.close();
});

test.afterAll(async ({ browser }) => {
    await browser.close();
})