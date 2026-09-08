import { Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class InventoryPage extends BasePage {
  constructor(public page: Page) {
    super(page);
  }


  getAllProducts(){
    return this.page.locator('[data-test="inventory-item"]')
  }

  getProductName(index: number){
    return this.getAllProducts().nth(index).locator('.inventory_item_name')
  }

  getProductPrice(index: number){
    return this.getAllProducts().nth(index).locator('.inventory_item_price');
    
  }

  getAddToCartButton(index: number){
    return this.getAllProducts().nth(index).locator('button').first();
  }

    get cartBadge() {
    return this.page.locator('.shopping_cart_badge');
  }

  async addProductToCart(index: number):Promise <{name: string, price: string}>{
    const rawName = await this.getProductName(index).textContent();
    const rawPrice = await this.getProductPrice(index).textContent();
    if (rawName === null || rawPrice === null) {
    throw new Error(`Could not find text for product at index ${index}`);
  }
  await this.getAddToCartButton(index).click();
    return { name: rawName.trim(), price: rawPrice.trim() };
  }

  async verifyCartCount(): Promise<number> {
    const badgeText = await this.cartBadge.textContent();
    return parseInt(badgeText || '0', 10);
  }

  async navigateToCartPage() {
    await this.cartBadge.click()
  }
}