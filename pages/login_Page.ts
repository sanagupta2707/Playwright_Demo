import { Page, Locator, expect, selectors } from '@playwright/test'
import WaitActionClass from '../action/WaitActions';
import webElementActionClass from '../action/WebElementActions';
import reusableActionsClass from '../action/ReusableActions';
let waitActionClass: WaitActionClass
let webElementActionClass_page: webElementActionClass;
let reusableActionsClass_page: reusableActionsClass;
import * as fs from 'fs';

class loginPage {

  page: Page;
  btnLogout:Locator;
  add_screen:Locator;
  logoutPopup:Locator;
  cancelLogoutBtn:Locator;
  signupLink:Locator;
  



  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
    webElementActionClass_page = new webElementActionClass(page);
    reusableActionsClass_page = new reusableActionsClass(page);

    this.btnLogout=page.locator("(//div[contains(@class,'cursor-pointer')])");
    this.add_screen=page.locator(" //button[contains(text(),'Add Screen')]");
    this.logoutPopup=page.locator("//button[text()='Log out']");
    this.cancelLogoutBtn=page.locator("//button[text()='Cancel']");
    this.signupLink=page.locator("//a[text()='Sign Up']");
    
  
  }

  static readJsonFile(filePath: string): any {
      try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
      } catch (error) {
        console.error('Error reading JSON file:', error);
        return null;
      }
    }


  
  async clickOnLogout(){
    await this.btnLogout.last().click();
    console.log("Clicked on logout button");
  }
  async verifyTitle() {
    try {
      const title = await this.page.title();
      expect(title).toBe('Title of the page after login');
    } catch (error) {
      throw new Error(`Title not found"`);
    }
  }

  async clickLogoutButton(){
    await webElementActionClass_page.Click(this.logoutPopup);
    console.log("Clicked on confirm logout button");
  }
  async clickCancelLogoutButton(){
    await webElementActionClass_page.Click(this.cancelLogoutBtn);
    console.log("Clicked on cancel logout button");
  }

}
export default loginPage