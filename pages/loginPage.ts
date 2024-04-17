import { TIMEOUT } from "dns";
import { BasePage } from "./basePage";



export class LoginPage extends BasePage{

    async gotoLoginPage(){
        await this.page.goto('/login.html');
    }

    async login(username: string, password: string){
        await this.getEmailAddress.fill(username)
        await this.getPassword.fill(password)
        await this.getSigninButton.click()
    }

    async passwordErrorMessage(){
        const titleText = await this.getPasswordErrorMessage.innerText({ timeout: 30000 });
        return titleText;
    }


    async emailErrorMessage(){
        const titleText = await this.getEmailErrorMessage.innerText({ timeout: 30000 });
        return titleText;
    }


}