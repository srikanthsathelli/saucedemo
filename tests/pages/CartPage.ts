import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(public page: Page) {
    super(page);
  }

  get cartItem() {
    return this.page.locator('[data-test="inventory-item"]');
  }
  get cartItemName() {
    return this.cartItem.locator('[data-test="inventory-item-name"]')
  }
  get cartItemPrice() {
    return this.cartItem.locator('[data-test="inventory-item-price"]')
  }

  get checkoutButton() {
    return this.page.getByRole('button', { name: 'Checkout' });
  }

  get cartQuantity() {
    return this.page.locator('[data-test="item-quantity"]');
  }

 async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async getCartItemDetails() {
    const name = await this.cartItemName.textContent();
    const price = await this.cartItemPrice.textContent();
    return { name, price };
  }

  async navigateToCartPage() {
    await this.page.goto('/cart.html');
  }

  async verifyCartCount() {
    const quantityText = await this.cartQuantity.textContent();
    return parseInt(quantityText || '0', 10);
  }

  async navigateToCheckoutPage() {
    await this.checkoutButton.click();
  }
}