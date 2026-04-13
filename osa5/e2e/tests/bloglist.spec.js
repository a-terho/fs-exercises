const { test, expect, beforeEach, describe } = require('@playwright/test');
const {
  createUser,
  loginAction,
  openBlogForm,
  fillAndSubmitBlogForm,
  createBlog,
} = require('./helpers');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await createUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen');

    await page.goto('/');
  });

  describe('Login', () => {
    beforeEach(async ({ page }) => {
      // siirry ensin kirjautumissivulle
      await page.getByRole('link', { name: 'login' }).click();
    });

    test('form is shown', async ({ page }) => {
      // etsi kirjautumislomakkeeseen liittyvät elementit
      await expect(page.getByText('login to application')).toBeVisible();
      await expect(page.getByLabel('username')).toBeVisible();
      await expect(page.getByLabel('password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
    });

    test('succeeds with correct credentials', async ({ page }) => {
      await loginAction(page, 'mluukkai', 'salainen');

      // kirjautumisen jälkeen oletetusti näkyvä uloskirjautumisnappi
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginAction(page, 'mluukkai', 'väärä');

      // kirjautumisen jälkeen oletetusti näkyvät elementit
      await expect(
        page.locator('.error').getByText('invalid username or password'),
      ).toBeVisible();
      await expect(page.getByRole('link', { name: 'login' })).toBeVisible();
      await expect(
        page.getByRole('button', { name: 'logout' }),
      ).not.toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'login' }).click();
      await loginAction(page, 'mluukkai', 'salainen');
      await page.getByRole('button', { name: 'logout' }).waitFor();
    });

    test('a new blog can be created', async ({ page }) => {
      // avaa ja täytä lomake
      await openBlogForm(page);
      const inputs = {
        title: "You Don't Know JS Yet (book series)",
        author: 'Kyle Simpson',
        url: 'https://github.com/getify/You-Dont-Know-JS',
      };
      await fillAndSubmitBlogForm(page, inputs);
      // etsi oletetusti näkyviä elementtejä
      await expect(
        page
          .locator('.info')
          .getByText(
            `new blog '${inputs.title}' by ${inputs.author} was added`,
          ),
      ).toBeVisible();
      await expect(
        page.locator('li').getByText(`${inputs.title} by ${inputs.author}`),
      ).toBeVisible();
    });

    describe('and a blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: "You Don't Know JS Yet (book series)",
          author: 'Kyle Simpson',
          url: 'https://github.com/getify/You-Dont-Know-JS',
        });
        // avaa blogisivu
        await page
          .getByRole('link', {
            name: "You Don't Know JS Yet (book series) by Kyle Simpson",
          })
          .click();
      });

      test('you can like the blog', async ({ page }) => {
        // paina tykkäysnappia
        await page.getByRole('button', { name: 'like' }).click();
        // oleta blogin tykkäysmäärän kasvaneen
        await expect(page.getByText('likes 1')).toBeVisible();
      });

      test('its creator can remove the blog', async ({ page }) => {
        // rekisteröi dialog-handleri, joka hyväksyy varmistusikkunan
        page.on('dialog', (dialog) => dialog.accept());
        // paina poistonappia
        await page.getByRole('button', { name: 'remove' }).click();
        // varmista että sivu vaihtuu ja blogiin liittyvää tekstiä ei enää löydy
        await expect(
          page.getByText("Kyle Simpson: You Don't Know JS Yet (book series)"),
        ).not.toBeVisible();
        await expect(
          page.getByRole('link', {
            name: "You Don't Know JS Yet (book series) by Kyle Simpson",
          }),
        ).not.toBeVisible();
      });
    });
  });
});
