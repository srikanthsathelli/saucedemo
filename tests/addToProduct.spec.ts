import { expect } from '@playwright/test'
import { test } from '../fixtures/testFixtures'
import { appTestData } from '../test-data/appTestData'

test.use({ storageState: 'playwright/.auth/standard_user.json' });

test.describe('Add products to cart', () => {
  test('should add first product to cart', async ({ page, inventoryPage, cartPage, checkoutPage, paymentOverviewPage, orderConfirmationPage }) => {

    let addedProductDetails: any;
    let cartCount: number;
    let cartItemPrice: string | undefined;

    await test.step('Add first product to cart from inventory page', async () => {
      await page.goto('/inventory.html');
      addedProductDetails = await inventoryPage.addProductToCart(0);
      cartCount = await inventoryPage.verifyCartCount();
      expect(cartCount).toBe(1);
    });

    await test.step('Verify cart item matches the product added', async () => {
      await inventoryPage.navigateToCartPage();
       console.log('CURRENT URL AFTER NAVIGATION:', page.url()); 
      const cartItemDetails = await cartPage.getCartItemDetails();  // ← add this one line

      const cartItemName = cartItemDetails.name?.trim();
      cartItemPrice = cartItemDetails.price?.trim();
      expect(cartItemName).toBe(addedProductDetails.name);
      expect(cartItemPrice).toBe(addedProductDetails.price);
      expect(await cartPage.verifyCartCount()).toBe(cartCount);
    });

    await test.step('Proceed to checkout with customer info', async () => {
      await cartPage.navigateToCheckoutPage();
      await checkoutPage.checkout(
        appTestData.checkoutInfo.firstName,
        appTestData.checkoutInfo.lastName,
        appTestData.checkoutInfo.postalCode
      );
    });

    await test.step('Verify item total on payment overview page', async () => {
      expect(await paymentOverviewPage.itemTotal()).toBe(cartItemPrice);
    });

    await test.step('Finalize purchase and verify confirmation notes', async () => {
      await paymentOverviewPage.finalizePurchase();
      const thankyouNote = await orderConfirmationPage.verifyThankyouNote();
      const dispatchNote = await orderConfirmationPage.verifyInvoiceDispatchNote();
      expect(thankyouNote).toBe(appTestData.orderConfirmMessages.thankyouNote);
      expect(dispatchNote).toBe(appTestData.orderConfirmMessages.dispatchNote);
    });
  });
});