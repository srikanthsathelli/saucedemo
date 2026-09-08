import {test,expect} from '@playwright/test'
import { LoginPage } from './pages/loginPage';

test.describe('Login Page Tests', () => {
  let loginPage:LoginPage;
  
  test.beforeEach(async ({page})=>{
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should login with valid credentials', async ({page}) => {
    await loginPage.login(process.env.USER_NAME!, process.env.USER_PASSWORD!);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});
});