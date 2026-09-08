import {test,expect} from '@playwright/test'
import { LoginPage } from '../pages/loginPage'

test.describe('Login Page Tests', () => {
  let loginPage:LoginPage;

  test('save standard user storage state', async ({page}) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
     await page.context().storageState({
        path: 'playwright/.auth/standard_user.json'
    });

});
});