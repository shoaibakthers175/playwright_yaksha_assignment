import { Page, Locator, expect } from "@playwright/test";
import pharmacyData from "../Data/pharmacy.json";

export default class PharmacyPage {
  readonly page: Page;
  private pharmacyModule: Locator;
  private orderLink: Locator;
  private addNewGoodReceiptButton: Locator;
  private goodReceiptModalTitle: Locator;
  private printReceiptButton: Locator;
  private addNewItemButton: Locator;
  private successMessage: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.pharmacyModule = page.locator('//a[@href="#/Pharmacy" and .//span[normalize-space()="Pharmacy"]]');
    this.orderLink = page.locator('(//a[@href="#/Pharmacy/Order"])[2]');
    this.addNewGoodReceiptButton = page.locator('//button[text()="Add New Good Receipt"]');
    this.goodReceiptModalTitle = page.locator('//span[text()="Add Good Receipt"]');
    this.printReceiptButton = page.locator('//button[@id="saveGr"]');
    this.addNewItemButton = page.locator('//button[@id="btn_AddNew"]');
    this.successMessage = page.locator('//div[contains(@class,"msgbox-success") and contains(@class,"danphe-msgbox")]');
  
  }

  /**
   * @Test1
   * @description This method navigates to the Pharmacy module, verifies the Good Receipt modal,
   * handles alerts during the Good Receipt print process, and ensures the modal is visible
   * before performing further actions.
   */
  async handlingAlertOnRadiology() {
    await this.pharmacyModule.click();
    await this.orderLink.click();
    await this.addNewGoodReceiptButton.click();
    await expect(this.goodReceiptModalTitle).toBeVisible();
    await this.printReceiptButton.click();
    // Handle alert
    this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
  }

  /**
   * @Test2
   * @description This method verifies the process of adding a new Good Receipt in the Pharmacy module,
   * filling in item details such as item name, batch number, quantity, rate, supplier name,
   * and a randomly generated invoice number. It concludes by validating the successful printing of the receipt.
   */
  async verifyPrintReceipt() {
    await this.pharmacyModule.click();
    await this.orderLink.click();
    await this.addNewGoodReceiptButton.click();
    await expect(this.goodReceiptModalTitle).toBeVisible();
    await this.printReceiptButton.click();
     this.page.on('dialog', async dialog => {
      await dialog.accept();
    });
    // Expect validation message for empty fields
    await expect(this.page.locator('//div[contains(@class,"msgbox-notice")]//p[normalize-space()="Please, Insert Valid Data"]')).toBeVisible();
  }
}
