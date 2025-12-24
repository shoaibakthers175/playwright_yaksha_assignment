import { Locator, Page, expect } from "@playwright/test";
import doctorData from "../Data/doctor.json";

export class DoctorsPage {
  readonly page: Page;
  private doctorsLink: Locator;
  private inpatientDepartmentTab: Locator;
  private searchBar: Locator;
  private orderDropdown: Locator;
  private imagingActionButton: Locator;
  private searchOrderItem: Locator;
  private proceedButton: Locator;
  private signButton: Locator;
  private successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.doctorsLink = page.locator('//a[@href="#/Doctors" and .//span[normalize-space()="Doctor"]]');
    this.inpatientDepartmentTab = page.locator('//ul[contains(@class,"page-breadcrumb")]//a[@href="#/Doctors/InPatientDepartment"]');
    this.searchBar = page.locator('(//input[@id="quickFilterInput"])[3]');
    this.orderDropdown = page.locator('//select[option[normalize-space()="Imaging"]]');
    this.imagingActionButton = page.locator('//a[@title="Imaging"]').first();
    this.searchOrderItem = page.locator('//input[@aria-label="search" and @placeholder="search order items"]');
    this.proceedButton = page.locator('//button[normalize-space()="Proceed" and contains(@class,"btn")]');
    this.signButton = page.locator('//button[normalize-space()="Sign" and contains(@class,"btn-primary")]');
    this.successMessage = page.locator('//div[contains(@class,"msgbox-success") and contains(@class,"danphe-msgbox")]');
  }

  /**
   * @Test9
   * @description This method verifies the process of placing an imaging order for an inpatient.
   * It navigates to the Inpatient Department, searches for a specific patient, selects an imaging action,
   * chooses an order type, specifies the order item, and completes the process by signing the order.
   * The method confirms the successful placement of the order by verifying the success message.
   */
  async performInpatientImagingOrder() {
    await this.doctorsLink.click();
    await this.inpatientDepartmentTab.click();
    await this.searchBar.fill(doctorData.patientName);
    await this.imagingActionButton.click();
    await this.orderDropdown.selectOption(doctorData.Dropdown.Option);
    await this.searchOrderItem.fill(doctorData.Dropdown.searchOrderItem);
    await this.searchOrderItem.press('Enter');
    await this.proceedButton.click();
    await this.signButton.click();
    await expect(this.successMessage).toBeVisible();
  }
}
