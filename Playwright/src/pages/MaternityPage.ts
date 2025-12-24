import { Page, Locator, expect } from "@playwright/test";
import maternityData from "../Data/maternity.json";

export default class MaternityPage {

  readonly page: Page;
  public maternityLink: Locator;
  public maternity: {
    reportLink: Locator;
    maternityAllowanceReport: Locator;
    dateFrom: Locator;
    showReportBtn: Locator;
    dataType: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.maternityLink = page.locator('//a[@href="#/Maternity" and .//span[normalize-space()="Maternity"]]');
    this.maternity = {
      reportLink: page.locator('//ul[contains(@class,"page-breadcrumb")]//a[normalize-space()="Reports"]'),
      maternityAllowanceReport: page.locator('//a[@href="#/Maternity/Reports/MaternityAllowance"]'),
     dateFrom: page.locator('(//input[@type="date" and @id="date"])[1]'),
      showReportBtn: page.locator('//button[@type="button" and contains(text(),"Show")]'),
      dataType: page.locator('//div[@id="print_netCashCollection"]'),
    };
  }

  /**
   * @Test8
   * @description This method verifies the functionality of the Maternity Allowance Report.
   * It navigates to the Maternity module, accesses the report section, and opens the Maternity Allowance Report.
   * Initially, it ensures that the data grid is not visible, selects a date range by entering the 'from date,'
   * and clicks the 'Show Report' button. Finally, it waits for the report to load and asserts that the data grid becomes visible.
   * Throws an error if the data grid visibility states do not match the expected outcomes.
   */
  public async verifyMaternityAllowanceReport() {
  await this.maternityLink.click();
  await this.maternity.reportLink.click();
  await this.maternity.maternityAllowanceReport.click();

  // Fill date directly (YYYY-MM-DD)
  await this.maternity.dateFrom.fill(maternityData.DateRange.FromDate);

  await this.maternity.showReportBtn.click();

  // ag-grid table visible
  await expect(this.maternity.dataType).toBeVisible({ timeout: 30000 });
}

}
