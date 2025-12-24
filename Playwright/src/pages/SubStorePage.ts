import { Locator, Page, expect } from "@playwright/test";
import subStoreData from "../Data/subStore.json";

export class SubStorePage {
  readonly page: Page;
    public substore: {
        substoreLink: Locator;
        selectSubstore: Locator;
        inventoryRequisition: Locator;
        inventory: Locator;
    }

    constructor(page: Page) {
        this.page = page;
        this.substore = {
            substoreLink: page.locator('//span[normalize-space()="SubStore"]'),
            selectSubstore: page.locator('//span[contains(@class,"report-name")]//i[normalize-space()="SubStore1"]'),
            inventoryRequisition: page.locator('//a[@href="#/WardSupply/Inventory/InventoryRequisitionList" and normalize-space()="Inventory Requisition"]'),
            inventory: page.locator('//div[contains(@class,"page-content")]')
        }
    }

  /**
     * @Test6
     * @description This method navigates to the Inventory Requisition section, captures a screenshot of the page, 
     *              and saves it in the screenshots folder.
     * @expected
     * Screenshot of the page is captured and saved successfully.
     */
  async captureInventoryRequisitionScreenshot() {
    await this.substore.substoreLink.click();
    await this.substore.selectSubstore.click();
    await this.substore.inventoryRequisition.click();
    await this.page.screenshot({ path: 'screenshots/inventory-requisition.png' });
  }
}
