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

test("Librarian login with valid credential", async({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.login(process.env.LIBRARIAN_USERNAME || '', process.env.LIBRARIAN_PASSWORD || '');
})

test("Librarian login with invalid password, they should see “Sorry, Wrong Email or Password” message.", async({page}) =>{

loginPage = new LoginPage(page);
await loginPage.login(process.env.LIBRARIAN_USERNAME || '', 'invalidPassword');
const invalidPasswordMessege = page.getByText("Sorry, Wrong Email or Password");

expect(invalidPasswordMessege.isVisible)
})