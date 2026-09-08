import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../tests/pages/InventoryPage';
import { CartPage } from '../tests/pages/CartPage';
import { CheckoutPage } from '../tests/pages/CheckoutPage';
import { PaymentOverviewPage } from '../tests/pages/PaymentOverviewPage';
import {OrderConfirmationPage} from '../tests/pages/OrderconfirmationPage';

type MyFixtures = {
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  paymentOverviewPage: PaymentOverviewPage;
  orderConfirmationPage: OrderConfirmationPage;
};

export const test = base.extend<MyFixtures>({
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);

    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);

    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  paymentOverviewPage: async ({ page }, use) => {
    const paymentOverviewPage = new PaymentOverviewPage(page);
    await use(paymentOverviewPage);
  },
  orderConfirmationPage: async ({ page }, use) => {
    const orderConfirmationPage = new OrderConfirmationPage(page);
    await use(orderConfirmationPage);
  }
});

// export { expect };