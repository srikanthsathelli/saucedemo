import { Page } from '@playwright/test';
import { CartPage } from './CartPage';



export class PaymentOverviewPage {
  constructor(public page: Page) {
  }

    get itemTotalValue() {
        return this.page.locator('[data-test="subtotal-label"]')
    }
  
    get lastNameInput() {
        return this.page.getByPlaceholder('Last Name');
    }

    get postalCodeInput() {
        return this.page.getByPlaceholder('Zip/Postal Code');
    }

    get finishButton() {
        return this.page.getByRole('button', { name: 'Finish' });
    }

    async itemTotal() {
        const rawText =  await this.itemTotalValue.textContent();
        const totalValue = rawText?.replace('Item total:', '').trim()
        return totalValue;
    }

    async finalizePurchase() {
        await this.finishButton.click();
    }
}