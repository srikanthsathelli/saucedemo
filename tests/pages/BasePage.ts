import { Page } from '@playwright/test';

export class BasePage {
      constructor(public page: Page){
        this.page = page
      }
      
 async navigate() {
    await this.page.goto('/');
  }
  async reload() {
    await this.page.reload();
  }
  
async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

}