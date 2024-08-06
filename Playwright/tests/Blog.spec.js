// @ts-check
const { test, expect } = require('@playwright/test');

test('front page can be opened', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const locator = await page.getByText('Blog tracker')
  await expect(locator).toBeVisible()
  await expect(page.getByText('username')).toBeVisible()
  await expect(page.getByText('password')).toBeVisible()
  await expect(page.getByText('cancel')).toBeVisible()
})

test('Hide and unhide the login Form', async ({ page }) => {
  await page.goto('http://localhost:5173')

  await expect(page.getByText('username')).toBeVisible()
  await expect(page.getByText('password')).toBeVisible()
  
  await page.getByRole('button', { name: 'cancel'}).click()
  
  await expect(page.getByText('username')).not.toBeVisible()
  await expect(page.getByText('password')).not.toBeVisible()

  await page.getByRole('button', { name: 'Login'}).click()

  await expect(page.getByText('username')).toBeVisible()
  await expect(page.getByText('password')).toBeVisible()
})

test('Succesfully login', async ({ page }) => {
  await page.goto('http://localhost:5173')

  const textboxes = await page.getByRole('textbox').all()
  await textboxes[0].fill('pass')
  await textboxes[1].fill('password')

  await page.getByRole('button', { name: 'login' }).click()

  await expect(page.getByText('Henk logged in')).toBeVisible()
})
