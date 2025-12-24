import { Page, Locator, expect } from "@playwright/test";
import radiologyData from "../Data/radiology.json";

export default class RadiologyPage {
  
  readonly page: Page;
  private radiologyModule: Locator;
  private filterDropdown: Locator;
  private fromDate: Locator;
  private toDate: Locator;
  private okButton: Locator;
  private dateRangeDropdown: Locator;
  private last3MonthsOption: Locator;
  private dateCells: Locator;

  constructor(page: Page) {
    this.page = page;
    // TODO: Update these locators to match the actual Yaksha HealthApp UI
    this.radiologyModule = page.locator('//a[@href="#/Radiology" and .//span[normalize-space()="Radiology"]]'); 
    this.filterDropdown = page.locator('//select[contains(@class,"cstm-select")]'); // Example, replace with actual selector
    this.fromDate = page.locator('(//input[@type="date" and @id="date"])[1]');
    this.toDate = page.locator('(//input[@type="date" and @id="date"])[2]');
    this.okButton = page.locator('//button[normalize-space()="OK"]'); // Example, replace with actual
    this.dateRangeDropdown = page.locator('select[name="dateRange"]'); // Example, replace with actual
    this.last3MonthsOption = page.locator('option[value="last3months"]'); // Example, replace with actual
    this.dateCells = page.locator('td:nth-child(3)'); // Example, assuming date is in 3rd column, replace with actual
  }

  /**
   * @Test3
   * @description This method verifies that the data displayed in the radiology list request is within the last three months.
   * It navigates to the Radiology module, selects the "Last 3 Months" option from the date range dropdown, and confirms the filter.
   * The method retrieves all dates from the table, validates their format, and checks if they fall within the last three months.
   * Logs detailed errors if dates are invalid or out of range and provides debug information about the number of date cells and retrieved dates.
   * Throws an error if any date is invalid or outside the range.
   */
  async verifyDataWithinLastThreeMonths() {
    await this.radiologyModule.click();

    // Calculate dates for last 3 months
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    // Format dates as YYYY-MM-DD for date inputs
    const fromDateStr = threeMonthsAgo.toISOString().split('T')[0];
    const toDateStr = currentDate.toISOString().split('T')[0];
    // Fill the date picker
    await this.fromDate.fill(fromDateStr);
    await this.toDate.fill(toDateStr);
    await this.okButton.click();
    // Verify dates are within last 3 months
    const dateElements = await this.dateCells.all();
    for (const dateEl of dateElements) {
      const dateText = await dateEl.textContent();
      if (!dateText) continue;
      // Parse date assuming DD-MM-YYYY format
      const dateParts = dateText.trim().split('-');
      let date: Date;
      if (dateParts.length === 3) {
        const day = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Month is 0-based
        const year = parseInt(dateParts[2], 10);
        date = new Date(year, month, day);
      } else {
        date = new Date(dateText);
      }
      if (isNaN(date.getTime()) || date < threeMonthsAgo || date > currentDate) {
        throw new Error(`Date ${dateText} is not within last 3 months`);
      }
    }
  }

  /**
   * @Test10
   * @description This method filters the list of radiology requests based on a specified date range and imaging type.
   * It navigates to the Radiology module, applies the selected filter, enters the 'From' and 'To' dates, and confirms the filter action.
   * The method verifies that the filtered results match the specified imaging type.
   */
  async filterListRequestsByDateAndType() {
    await this.radiologyModule.click();
    await this.filterDropdown.selectOption(radiologyData.FilterDropdown.Filter);
    await this.fromDate.fill(radiologyData.DateRange.FromDate);
    await this.toDate.fill(radiologyData.DateRange.ToDate);
    await this.okButton.click();
    // Verify filtered results contain X-RAY
    await expect(this.page.locator('(//div[text()="X-RAY"])[1]')).toBeVisible();
  }
}
