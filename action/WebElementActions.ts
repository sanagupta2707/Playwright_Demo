import { Page, Locator } from '@playwright/test'
import WaitActionClass from './WaitActions';

let waitActionClass: WaitActionClass

class WebElementActionClass {
  waitForSelector(successMessage: any) {
    throw new Error('Method not implemented.');
  }

  page: Page;

  constructor(page: Page) {
    this.page = page;
    waitActionClass = new WaitActionClass(page);
  }
  async Click(element: Locator) {
    await waitActionClass.waitForElementVisible(element);
    await element.click();
  }
  async force_Click(element: Locator) {
    await waitActionClass.waitForElementVisible(element);
    await element.click({ force: true });
  }
  async d_Click(element: Locator) {
    await waitActionClass.waitForElementVisible(element);
    await element.dblclick();
  }
  async send_Keys(textLocator: Locator, text: string, youtube?: any) {
    await waitActionClass.waitForElementVisible(textLocator);
    await textLocator.fill(text);
  }
  async Hoverover(element: Locator) {
    await waitActionClass.waitForElementVisible(element);
    await element.hover();
  }
}
export default WebElementActionClass