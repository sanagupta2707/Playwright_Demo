import { Page, Locator } from '@playwright/test'
class WaitActionClass {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForElementVisible(element: Locator) {
        try {
            await element.waitFor({ timeout: 30000 });
        } catch (error) {
            console.error(`Error waiting for element to be visible: ${error.message}`);
            throw error;
        }
    }

    async WaitUntilElementVisible(element: Locator) {
        try {
            await element.waitFor({ state: 'visible', timeout: 600000 }); 
        } catch (error) {
            console.error(`Error waiting for element to be visible: ${error.message}`);
            throw error;
        }
    }

    async WaitUntilElementToDisappear_hidden(element: Locator) {
        try {
            await element.waitFor({ state: 'hidden' });
            await element.waitFor({ timeout: 60000 });
            console.log('Element disappeared');
        } catch (error) {
            console.error('Error waiting for element to disappear:', error);
            throw error;
        }
    }

    async WaitUntilElementToDisappear(element: Locator) {
        try {
            await element.waitFor({ state: 'hidden', timeout: 300000 });
            await element.waitFor({ state: 'detached', timeout: 300000 });
            console.log('Element completely disappeared (detached from the DOM)');
        } catch (error) {
            console.error('Error waiting for element to disappear:', error);
            throw error;
        }
    }

}
export default WaitActionClass