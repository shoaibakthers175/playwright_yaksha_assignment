import { Locator, Page, expect } from "@playwright/test";
import loginData from "../Data/login.json";

export class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private loginErrorMessage: Locator;
  private admin: Locator;
  private logOut: Locator;

  constructor(page: Page) {
    this.page = page;

    // ✅ Correct & stable locators (Yaksha UI friendly)
    this.usernameInput = page.locator('//input[@name="Username"]');
    this.passwordInput = page.locator('//input[@name="password"]');
    this.loginButton = page.locator('//button[@id="login"]');
    this.loginErrorMessage = page.locator("//div[contains(@class,'alert') and contains(text(),'Invalid credentials')]");
    this.admin = page.locator("//li[contains(@class,'dropdown-user')]");
    this.logOut = page.locator("//li[contains(@class,'dropdown-user')]//a[normalize-space()='Log Out']");

  }

  /**
   * @Test0
   * Login with valid credentials
   */
  async performLogin() {
    await this.usernameInput.fill(loginData.ValidLogin.ValidUserName);
    await this.passwordInput.fill(loginData.ValidLogin.ValidPassword);

    await this.loginButton.click({ force: true });

    // await this.page.waitForLoadState('networkidle');

    // wait for dashboard/admin menu
    await expect(this.admin).toBeVisible({ timeout: 120000 });
  }

  /**
   * @Test5
   * Login with invalid credentials
   */
async performLoginWithInvalidCredentials() {
  await this.usernameInput.fill(loginData.InvalidLogin.InvalidUserName);
  await this.passwordInput.fill(loginData.InvalidLogin.InvalidPassword);
  await this.loginButton.click({ force: true });

  await this.page.waitForLoadState('networkidle');

  // wait for error message
  await expect(this.loginErrorMessage).toBeVisible({ timeout: 30000 });
}




  /**
   * @Test7
   * Logout from Admin dropdown
   */
  async verifyLogoutFunctionality() {
    await this.admin.click();
    await this.logOut.click();

    // verify redirected to login page
    await expect(this.loginButton).toBeVisible({ timeout: 30000 });
  }
}
