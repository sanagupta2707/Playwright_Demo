import { Page, Locator } from '@playwright/test'
import WebElementActionClass from './WebElementActions';
import WaitActionClass from './WaitActions';

import { promises as fs } from 'fs';
const signupData = require('../json_data/signup.json');
let waitActionClass: WaitActionClass
let webElementActionClass_page: WebElementActionClass;
let mobileKey: string;
let mobileNumber: string;


class reusableActionsClass {
  loginWithInvalidOTP() {
    throw new Error('Method not implemented.');
  }

  page: Page;
  txtboxPhoneNumber: Locator;
  btnGetOtp: Locator;
  textEnterOTP: Locator;
  btnVerify: Locator;
  btnProfileMenu: Locator;
  logout: Locator;
  cancelLogout: Locator;

  constructor(page: Page) {
    this.page = page;
    webElementActionClass_page = new WebElementActionClass(page);
    waitActionClass = new WaitActionClass(page);
    this.txtboxPhoneNumber = page.locator("//input[@id='phoneNumber']")
    this.btnGetOtp = page.locator("//button[text()='Get OTP']")
    this.textEnterOTP = page.locator("//input[@autocomplete='one-time-code']")
    this.btnVerify = page.locator("//button[text()='Verify']")
    this.btnProfileMenu = page.locator(".lucide.lucide-log-out");
    this.logout = page.locator("//button[text()='Log out']")
    this.cancelLogout = page.locator("//button[text()='Cancel']")
  }

  async userLoginWithJson(mobile_no: string, otp: string) {
    await waitActionClass.WaitUntilElementVisible(this.txtboxPhoneNumber);
    await this.page.goto('/')
    await webElementActionClass_page.send_Keys(this.txtboxPhoneNumber, mobile_no, otp);
    await webElementActionClass_page.Click(this.btnGetOtp);
    await webElementActionClass_page.send_Keys(this.textEnterOTP, otp);
    // await webElementActionClass_page.Click(this.btnVerify);
  }

  async userLogout() {
    await webElementActionClass_page.Click(this.btnProfileMenu);
    await webElementActionClass_page.Click(this.logout);
    await waitActionClass.WaitUntilElementVisible(this.txtboxPhoneNumber);

  }

  async click_logout_btn() {
    await webElementActionClass_page.Click(this.btnProfileMenu);
  }

  async Click_logout_option() {
    await webElementActionClass_page.Click(this.logout);
  }
  async click_cancel_logout_option() {
    await webElementActionClass_page.Click(this.cancelLogout);
  }


  async getInputValue(selector: Locator): Promise<string> {
    if (!selector) {
      throw new Error('Locator must be provided');
    }

    try {
      // Try to get the live input value (works for most cases)
      const value = await selector.inputValue();
      return value;
    } catch {
      // Fallback: use getAttribute in case inputValue() fails
      const attr = await selector.getAttribute('value');
      return attr || '';
    }
  }

  // utils/time.ts
  async getCurrentTimestamp(local = true): Promise<string> {
    const now = local ? new Date() : new Date(new Date().toUTCString());
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const dd = String(now.getDate()).padStart(2, '0');
    const yyyy = String(now.getFullYear());
    const HH = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const sec = String(now.getSeconds()).padStart(2, '0');

    return `${mm}${dd}${yyyy}${HH}${min}${sec}`;
  }

  static generateMobileNumber(): string {
    const firstDigit = Math.floor(Math.random() * 3) + 7; // Ensures the number starts with 7, 8, or 9
    const remainingDigits = Math.floor(100000000 + Math.random() * 900000000); // Generates 9 random digits
    return `${firstDigit}${remainingDigits}`;
  }
  generateRandomEmail(): string {
    const timestamp = Date.now(); // gives unique number based on current time
    const randomNum = Math.floor(Math.random() * 1000); // adds extra randomness
    return `testuser${timestamp}${randomNum}@gmail.com`;
  }


  async readDataFromJson(filePath: string): Promise<any> {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error(`❌ Error reading JSON file at ${filePath}:`, error);
      throw error;
    }
  }

  async userLogin() {
    mobileKey = process.env.MOBILE_KEY || 'business_mobile';
    mobileNumber = signupData[mobileKey] || signupData.business_mobile;
    console.log(`Using mobile key: ${mobileKey} with ${mobileNumber}`);
    await this.page.goto('/')
    await webElementActionClass_page.send_Keys(this.txtboxPhoneNumber, mobileNumber);
    await webElementActionClass_page.Click(this.btnGetOtp);
    await webElementActionClass_page.send_Keys(this.textEnterOTP, "9999");
    //await webElementActionClass_page.Click(this.btnVerify);
  }

  async generateRandomNumber(length: number) {
    // First digit must be 6–9
    let firstDigit = Math.floor(Math.random() * 4) + 6; // gives 6,7,8,9

    // Remaining digits can be 0–9
    let remaining = Array.from({ length: length - 1 }, () =>
      Math.floor(Math.random() * 10)
    ).join('');

    return `${firstDigit}${remaining}`;
  }

  static async generateEmail(): Promise<string> {
    const timestamp = Date.now();
    return `user_${timestamp}@gmail.com`;
  }

  static async generate_random_firstname(): Promise<string> {
    const timestamp = Date.now();
    return `FirstName`;
  }

  static async generate_random_lastname(): Promise<string> {
    const timestamp = Date.now();
    return `LastName`;
  }

  static enter_buisness_name(): string {
    const timestamp = Date.now();
    return `Business_${timestamp}`;
  }

  static normalizeDate(uiDate: string): string {
    const normalizedInput =
      /\d{1,2}\s[A-Za-z]{3}\s\d{4}\s\d{1,2}$/.test(uiDate)
        ? `${uiDate}:00`
        : uiDate;

    const date = new Date(normalizedInput);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}`;
  }







}
export default reusableActionsClass