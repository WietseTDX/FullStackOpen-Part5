import { test, expect, describe, beforeEach } from '@playwright/test';
import { before } from 'node:test';

describe('UserRight tests', async () => {
  let browser
  let page

  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3000/api/testing/reset')

    const henkUser = {
      username: "pass",
      name: "Henk",
      password: "password",
    };

    const janUser = {
      username: "test",
      name: "Jan",
      password: "pass",
    };

    let userData = await request.post('http://localhost:3000/api/users', {
      data: henkUser
    });

    const user = await userData.json()
    await request.post('http://localhost:3000/api/testing/addBlog', {
      data: {
        title: "First blog",
        author: "Me",
        url: "you",
        likes: 21,
        user: user,
      }
    });

    userData = await request.post('http://localhost:3000/api/users', {
      data: janUser
    });

    // setup webpage and login
    await page.goto('http://localhost:5173/');
    await page.getByTestId('Login-Username').fill(janUser.username);
    await page.getByTestId('Login-Password').fill(janUser.password);
    await page.getByRole('button', { name: 'Login' }).click();

    // verify logged in
    await expect(page.getByText('Jan logged in Logout')).toBeVisible();
  });

  describe('See if a not owner of blog user can see delete button', async () => {
    test(('open and close blog menu'), async ({ page }) => {
      await page.getByRole('button', { name: 'New Blog' }).click();
      await expect(page.getByRole('button', { name: 'Add Blog' })).toBeVisible();
      await page.getByRole('button', { name: 'cancel' }).click();
      await expect(page.getByRole('button', { name: 'New Blog' })).toBeVisible();
    });

    test(("I cannot see delete button on blog from Henk"), async ({ page }) => {
      const blogContainer = page.locator('div.blogs-container');

      const firstBlog = blogContainer.locator('div.blog-item').first();

      const blogText = await firstBlog.textContent();

      expect(blogText).toContain('Title:');
      expect(blogText).toContain('Author:');
      expect(blogText).toContain('Url:');
      expect(blogText).toContain('Likes:');
      expect(blogText).toContain('User:');

      await page.getByRole('button', { name: 'Show' }).click();
      await expect(page.getByText('Url: you Likes: 21 Like User: Henk')).toBeVisible();
      const deleteButton = await page.getByRole('button', { name: 'Delete' });
      await expect(deleteButton).not.toBeVisible();
    });
  });
});
