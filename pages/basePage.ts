import {Page, Locator} from "@playwright/test";

export class BasePage{
    readonly page: Page;
       
        readonly getEmailAddress: Locator;
        readonly getPassword: Locator;
        readonly getSigninButton: Locator;
        readonly getErrorMessage: Locator;
        readonly getPasswordErrorMessage: Locator;
        readonly getEmailErrorMessage: Locator;
    
        constructor(page: Page){
            this.page = page;
            this.getEmailAddress = page.locator('#inputEmail');
            this.getPassword = page.locator('#inputPassword');
            this.getSigninButton = page.locator('button[type="submit"]')
            this.getErrorMessage = page.locator('#inputEmail-error')
            this.getPasswordErrorMessage = page.locator(':text-is("Sorry, Wrong Email or Password")')
            this.getEmailErrorMessage = page.locator(':text-is("Please enter a valid email address.")')
        }
    }


