const { test, expect, beforeEach, describe } = require('@playwright/test');
const {
  createUser,
  loginAction,
  fillAndSubmitBlogForm,
  findFirstLikes,
} = require('./helpers');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await createUser(request, 'Matti Luukkainen', 'mluukkai', 'salainen');

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    // etsi kirjautumislomakkeeseen liittyvät elementit
    await expect(page.getByText('login to application')).toBeVisible();
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginAction(page, 'mluukkai', 'salainen');

      // kirjautumisen jälkeen oletetusti näkyvä teksti
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginAction(page, 'mluukkai', 'väärä');

      // kirjautumisen jälkeen oletetusti näkyvä teksti
      await expect(
        page.locator('.error').getByText('invalid username or password'),
      ).toBeVisible();
    });
  });

  test('Logging out succeesds', async ({ page }) => {
    await loginAction(page, 'mluukkai', 'salainen');
    await page.getByRole('button', { name: 'logout' }).click();

    // tarkista että sekä ilmoitusikkuna että kirjautumislomake on nähtävillä
    await expect(page.locator('.info').getByText('logged out')).toBeVisible();
    await expect(page.getByText('login to application')).toBeVisible();
    await expect(page.getByLabel('username')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginAction(page, 'mluukkai', 'salainen');
      await page.getByText('Matti Luukkainen logged in').waitFor();
    });

    test('a new blog can be created', async ({ page }) => {
      // avaa ja täytä lomake
      await page.getByRole('button', { name: 'create blog' }).click();
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
        page.locator('.blog').getByText(`${inputs.title} ${inputs.author}`),
      ).toBeVisible();
    });

    describe('and a blog is created', () => {
      beforeEach(async ({ page }) => {
        // avaa ja täytä lomake
        await page.getByRole('button', { name: 'create blog' }).click();
        const inputs = {
          title: "You Don't Know JS Yet (book series)",
          author: 'Kyle Simpson',
          url: 'https://github.com/getify/You-Dont-Know-JS',
        };
        await fillAndSubmitBlogForm(page, inputs);
        await page
          .locator('.info')
          .getByText(`new blog '${inputs.title}' by ${inputs.author} was added`)
          .waitFor();
      });

      test('you can like the blog', async ({ page }) => {
        // avaa blogi
        await page.getByRole('button', { name: 'view' }).click();
        // etsi blogin tykkäysmäärä ja paina tykkäysnappia
        const likesBefore = await findFirstLikes(page);
        await page.getByRole('button', { name: 'like' }).click();
        // odota sivulla esiintyvän tykkäysmäärän kasvaneen
        await expect(async () => {
          const likesAfter = await findFirstLikes(page);
          expect(likesAfter).toBe(likesBefore + 1);
        }).toPass();
      });

      test('its creator can remove the blog', async ({ page }) => {
        // rekisteröi dialog-handleri, joka hyväksyy varmistusikkunan
        page.on('dialog', (dialog) => dialog.accept());
        // avaa blogi
        await page.getByRole('button', { name: 'view' }).click();
        // paina poistonappia
        await page.getByRole('button', { name: 'remove' }).click();
        // varmista ettei blogiin liittvää tekstiä enää löydy
        await expect(
          page
            .locator('.blog')
            .getByText("You Don't Know JS Yet (book series)"),
        ).not.toBeVisible();
      });

      test('other logged in user cannot see remove button', async ({
        page,
        request,
      }) => {
        // luo toinen käyttäjä
        await createUser(request, 'A. Terho', 'a-terho', 'password');

        // kirjaa nykyinen käyttäjä ulos ja kirjaudu uudella sisään
        await page.getByRole('button', { name: 'logout' }).click();
        await loginAction(page, 'a-terho', 'password');

        // avaa blogi ja oleta, ettei poistonappia löydy
        await page.getByRole('button', { name: 'view' }).click();
        expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible();
      });
    });
  });
});
