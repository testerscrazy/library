import { BasePage } from "./basePage";
import { expect, type Locator, type Page } from "@playwright/test";


export class BookManagementPage extends BasePage {


    async gotoBookManagementPage(){

        await this.page.goto('#books')

    }


}