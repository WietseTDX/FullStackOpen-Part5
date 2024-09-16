import { test, expect, describe, beforeEach } from '@playwright/test';
import { before } from 'node:test';
import blog from '../../BackEnd/models/blog';
const { chromium } = require('playwright');

describe('Test the addition of blogform', async () => {
  let browser
  let page
  let user

  beforeEach(async ({ request }) => {
    await request.post('http://localhost:3000/api/testing/reset')

    const userData = await request.post('http://localhost:3000/api/users', {
      data: {
        username: "pass",
        name: "Henk",
        password: "password",
      }
    });

    user = await userData.json()
    await request.post('http://localhost:3000/api/testing/addBlog', {
      data: {
        title: "First blog",
        author: "Me",
        url: "you",
        likes: 21,
        user: user,
      }
    });

    // setup window
    browser = await chromium.launch();
    page = await browser.newPage();

    page.on('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept(); // or dialog.dismiss() if needed
    });

    // setup webpage and login
    await page.goto('http://localhost:5173/');
    await page.getByTestId('Login-Username').fill('pass');
    await page.getByTestId('Login-Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).click();

    // verify logged in
    await expect(page.getByText('Henk logged in Logout')).toBeVisible();
  });

  describe('Test adding a blog and deleting it', async () => {
    test(('open and close blog menu'), async () => {
      await page.getByRole('button', { name: 'New Blog' }).click();
      await expect(page.getByRole('button', { name: 'Add Blog' })).toBeVisible();
      await page.getByRole('button', { name: 'cancel' }).click();
      await expect(page.getByRole('button', { name: 'New Blog' })).toBeVisible();
    });

    test(('Add new blog'), async () => {
      await page.getByRole('button', { name: 'New Blog' }).click();
      await page.getByTestId('BlogForm-Title').fill('Title');
      await page.getByTestId('BlogForm-Author').fill('Author');
      await page.getByTestId('BlogForm-url').fill('URL');
      await page.getByRole('button', { name: 'Add Blog' }).click();
      await page.locator('div').filter({ hasText: /^ShowUrl: URL Likes: 0 Like User: Henk DeleteHide$/ }).getByRole('button').click();
      await expect(page.getByText('Title: Title Author: Author')).toBeVisible();
      await expect(page.getByText('Url: URL Likes: 0 Like User:')).toBeVisible();
    });
    test(('like blog twice'), async () => {
      await page.getByRole('button', { name: 'Show' }).click();
      let initalLikes = 21;
      let likeAction = 5
      for (let i = 1; i <= likeAction; i++) {
        await page.getByRole('button', { name: 'Like' }).click();
        await expect(page.getByText(`Likes: ${initalLikes + i}`).last()).toBeVisible();
      }
      await expect(page.getByText(`Likes: ${initalLikes + likeAction}`).last()).toBeVisible();
    });
    test(('delete blog'), async () => {
      await expect(page.getByText('Title: First blog Author: Me')).toBeVisible();
      await page.getByRole('button', { name: 'Show' }).click();
      await expect(page.getByText('Url: you Likes: 21 Like User: Henk')).toBeVisible();
      await page.getByRole('button', { name: 'Delete' }).click();
      await expect(page.getByText('Title: First blog Author: Me')).not.toBeVisible();
      await expect(page.getByText('Url: you Likes: 21 Like User:')).not.toBeVisible();
      await page.getByRole('button', { name: 'Logout' }).click();
      await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
      await expect(page.getByText('Username:')).toBeVisible();
      await expect(page.getByText('Password:')).toBeVisible();
    });
  });

  describe('Check added blogs in right order', async () => {

    const isAscending = arr => arr.every((val, i, array) => i === 0 || val >= array[i - 1]);

    test(("check if likes is order correctly"), async ({ request, page }) => {
      await request.post('http://localhost:3000/api/testing/addBlog', {
        data: {
          title: "Second blog",
          author: "Me",
          url: "you",
          likes: 5,
          user: user,
        }
      });

      // setup webpage and login, this is already done at before each but i need to reload the page
      // to load in the last added post
      await page.goto('http://localhost:5173/');
      await page.getByTestId('Login-Username').fill('pass');
      await page.getByTestId('Login-Password').fill('password');
      await page.getByRole('button', { name: 'Login' }).click();

      // verify logged in
      await expect(page.getByText('Henk logged in Logout')).toBeVisible();

      const blogContainer = page.locator('div.blogs-container');
      const blogs = await blogContainer.locator('div.blog-item').all();

      const likes = [];

      for (let i=0; i<blogs.length; i++) {
        const likesMatch = (await blogs[i].textContent()).match(/Likes:\s*(\d+)/);
        likes[i] = likesMatch ? likesMatch[1] : 'Likes not found';
      }

      await expect(isAscending(likes)).toBeTruthy();
      await expect(likes[0]).toMatch(/^\d+$/);
    });
  });
});
