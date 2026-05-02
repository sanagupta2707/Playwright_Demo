import { test, expect, Page } from '@playwright/test';
import reusableActionsClass from '../action/ReusableActions';
import login_page from '../pages/login_Page';

test.describe('Unesign Logout Test', () => {

    let loginPage: login_page;
    let actionsClass: reusableActionsClass;

    test.beforeEach(async ({ page }) => {
        loginPage = new login_page(page);
        actionsClass = new reusableActionsClass(page);
        await actionsClass.userLogin();
    });



    test('Testcase_001_Verify Logout Functionality', async ({ page }) => {

        await loginPage.clickOnLogout();
        await loginPage.clickLogoutButton();
        const currentUrl = page.url();
        console.log('Current URL after logout:', currentUrl);
        //expect(currentUrl).toContain('/login');
        expect(loginPage.signupLink).toBeVisible();
        console.log('Logout successful. Current URL:', currentUrl);
    });


    test('Testcase_002_Verify Cancel Logout Functionality', async ({ page }) => {

        await loginPage.clickOnLogout();
        await loginPage.clickCancelLogoutButton();
        await page.waitForTimeout(2000);
        const currentUrl = page.url();
        expect(loginPage.signupLink).not.toBeVisible();
        console.log('Logout successful. Current URL:', currentUrl);
    });




});