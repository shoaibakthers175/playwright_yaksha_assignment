import { Page, Locator, expect } from "@playwright/test";
import medicalRecordData from "../Data/medicalRecord.json";

export default class MedicalRecordsPage {
  readonly page: Page;
  public medicalRecord: {
    medicalRecordsLink: Locator;
    mrOutpatientList: Locator;
    okButton: Locator;
    fromDate: Locator;
    searchBar: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.medicalRecord = {
      medicalRecordsLink: page.locator('//a[@href="#/Medical-records" and .//span[normalize-space()="MedicalRecords"]]'),
      mrOutpatientList: page.locator('//ul[contains(@class,"page-breadcrumb")]//a[@href="#/Medical-records/OutpatientList"]'),
      okButton: page.locator('//button[contains(@class,"btn-success") and normalize-space()="OK"]'),
      searchBar: page.locator('(//input[@id="quickFilterInput"])[1]'),
      fromDate: page.locator('(//input[@type="date" and @id="date"])[1]'),
    };
  }

  /**
   * @Test4
   * @description This method verifies patient records in the Dispensary module by applying a date filter
   * and searching for a specific patient by gender. It validates the search results by checking if the
   * gender appears in the filtered records.
   */
  async keywordMatching() {
    await this.medicalRecord.medicalRecordsLink.click();
    await this.medicalRecord.mrOutpatientList.click();
     await this.medicalRecord.fromDate.fill(medicalRecordData.DateRange.FromDate);
    await this.medicalRecord.searchBar.fill(medicalRecordData.PatientGender.Gender);
    await this.medicalRecord.searchBar.press('Enter');
    await this.medicalRecord.okButton.click();
    
    // Verify results contain 'Female'
    await expect(this.page.locator('(//div[@role="gridcell" and @col-id="Gender" and normalize-space()="Female"])[4]')).toBeVisible();
  }
}
