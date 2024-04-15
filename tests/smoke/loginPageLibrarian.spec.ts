import { expect, test } from "playwright/test";
import { LoginPage } from "../../pages/loginPage";
import exp from "constants";
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
    
test("Librarian login with invalid email, they should see “Sorry, Wrong Email or Password” message.", async({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.login('invalidEmail', process.env.LIBRARIAN_PASSWORD || '');
    const invalidEmailMessege = page.getByText("Sorry, Wrong Email or Password");
    
    expect(invalidEmailMessege.isVisible)


})

