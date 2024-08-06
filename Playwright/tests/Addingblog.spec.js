import { test, expect } from '@playwright/test';
const { chromium } = require('playwright');

test('Test adding a blog and deleting it', async () => {
  let browser
  let page
  browser = await chromium.launch();
  page = await browser.newPage();

  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept(); // or dialog.dismiss() if needed
  });

  await page.goto('http://localhost:5173/');
  await page.getByTestId('Login-Username').fill('pass');
  await page.getByTestId('Login-Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Henk logged in Logout')).toBeVisible();
  await page.getByRole('button', { name: 'New Blog' }).click();
  await page.getByTestId('BlogForm-Title').fill('Title');
  await page.getByTestId('BlogForm-Author').fill('Author');
  await page.getByTestId('BlogForm-url').fill('URL');
  await page.getByRole('button', { name: 'Add Blog' }).click();
  await page.getByRole('button', { name: 'cancel' }).click();
  await expect(page.getByRole('button', { name: 'New Blog' })).toBeVisible();
  await page.locator('div').filter({ hasText: /^ShowUrl: URL Likes: 0 Like User: Henk DeleteHide$/ }).getByRole('button').click();
  await expect(page.getByText('Title: Title Author: Author')).toBeVisible();
  await expect(page.getByText('Url: URL Likes: 0 Like User:')).toBeVisible();
  for (let i=0; i<2; i++) {
    await page.getByRole('button', { name: 'Like' }).click();
    await page.waitForTimeout(1000)
  }
  await expect(page.getByText('Likes: 2').last()).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Title: Title Author: Author')).not.toBeVisible();
  await expect(page.getByText('Url: URL Likes: 0 Like User:')).not.toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByText('Username:')).toBeVisible();
  await expect(page.getByText('Password:')).toBeVisible();
});
