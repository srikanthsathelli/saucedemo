import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(public page: Page) {
    super(page);
  }

  get usernameInput() {
    return this.page.getByRole('textbox', { name: 'Username' });
  }
  
  get passwordInput() {
    return this.page.getByRole('textbox', { name: 'Password' });
  }

  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' });
  }

  async fillUserCredentials(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
  
  async login(username: string, password: string) {
    await this.fillUserCredentials(username, password);
    await this.clickLoginButton();
  }
}