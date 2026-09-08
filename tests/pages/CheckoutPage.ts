import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class CheckoutPage extends BasePage {
  constructor(public page: Page) {
    super(page);
  }

    get firstNameInput() {
        return this.page.locator('[data-test="firstName"]');
    }
  
    get lastNameInput() {
        return this.page.locator('[data-test="lastName"]');
    }

    get postalCodeInput() {
        return this.page.locator('[data-test="postalCode"]');
    }

    async fillCheckoutInformation(firstName:string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }
     async clickContinueButton() {
        await this.page.getByRole('button', { name: 'Continue' }).click();
    }

    async checkout(firstName:string, lastName: string, postalCode: string) {
        await this.fillCheckoutInformation(firstName, lastName, postalCode);
        await this.clickContinueButton();
    }


  
}