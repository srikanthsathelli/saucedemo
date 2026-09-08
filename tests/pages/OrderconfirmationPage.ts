import { Page } from '@playwright/test';
import { CartPage } from './CartPage';



export class OrderConfirmationPage {
  constructor(public page: Page) {
  }

    get thankYouNote() {
        return this.page.getByRole('heading', { name: 'Thank you for your order!' });
    }
    
    get dispatchNote() {
        return this.page.locator('[data-test="complete-text"]')
    }

    get generatePDFButton() {
        return this.page.getByRole('button', { name: 'Generate PDF' });
    }

    async verifyInvoiceDispatchNote() {
        return await this.dispatchNote.textContent();
    }
    async verifyThankyouNote() {
        return await this.thankYouNote.textContent();
    }

}