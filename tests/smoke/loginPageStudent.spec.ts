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

test("Student go directly to the library page without login and verify the error message", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.getSigninButton.click()
    const expectedErrorMessage = "This field is required.";
    const actualErrorMessage = await loginPage.errorMessage();
    expect(actualErrorMessage).toEqual(expectedErrorMessage);
})

test("Student click the login button after entering valid username and invalid password in the login page and  verify the error message", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(process.env.STUDENT_USERNAME || '', 'invalid-password');
    await loginPage.getSigninButton.click();

    const expectedErrorMessage = "Sorry, Wrong Email or Password"; 
    const actualErrorMessage = await loginPage.passwordErrorMessage();
    expect(actualErrorMessage).toEqual(expectedErrorMessage);
})



test("As a Student when I click the login button with entering invalid username and a valid password in the login page and then verify the error message", async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.login(process.env.STUDENT_PASSWORD || '', 'invalid-username');
    await loginPage.getSigninButton.click();
    const expectedErrorMessage = "Please enter a valid email address."; 
    const actualErrorMessage = await loginPage.emailErrorMessage();
    expect(actualErrorMessage).toEqual(expectedErrorMessage);
})

test.afterEach(async ({ page }) => {
    await page.close();
});

test.afterAll(async ({ browser }) => {
    await browser.close();
})
