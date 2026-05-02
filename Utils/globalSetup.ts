import { chromium, Browser, BrowserContext, FullConfig } from '@playwright/test';
import fs from "fs";
import path from "path";
import login_page from '../pages/login_Page';


let browser: Browser;
let context: BrowserContext;


async function globalSetup(config: FullConfig) {
  process.env.BASE_URL = config.projects[0].use?.baseURL || '';
  // Launch browser and create context
  browser = await chromium.launch();
  const page = await browser.newPage();
  context = await browser.newContext();

  // Save cookies and session state
  await context.storageState({ path: "storageState.json" });

  // Close browser after setup
  await browser.close();
}

export default globalSetup;