const { test, expect, beforeEach, describe } = require('@playwright/test');
const {
  createUser,
  loginAction,
  openBlogForm,
  fillAndSubmitBlogForm,
  createBlog,
  viewBlog,
  viewAndLikeBlog,
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
        page.locator('.blog').getByText(`${inputs.title} ${inputs.author}`),
      ).toBeVisible();
    });

    describe('and a blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, {
          title: "You Don't Know JS Yet (book series)",
          author: 'Kyle Simpson',
          url: 'https://github.com/getify/You-Dont-Know-JS',
        });
      });

      test('you can like the blog', async ({ page }) => {
        // avaa blogi
        const blog = await page.locator('.blog');
        await viewBlog(blog);
        // paina tykkäysnappia
        await blog.getByRole('button', { name: 'like' }).click();
        // oleta blogin tykkäysmäärän kasvaneen
        await expect(blog.getByText('likes 1')).toBeVisible();
      });

      test('its creator can remove the blog', async ({ page }) => {
        // rekisteröi dialog-handleri, joka hyväksyy varmistusikkunan
        page.on('dialog', (dialog) => dialog.accept());
        // avaa blogi
        const blog = await page.locator('.blog');
        await viewBlog(blog);
        // paina poistonappia
        await blog.getByRole('button', { name: 'remove' }).click();
        // varmista ettei blogiin liittyvää tekstiä enää löydy
        await expect(
          blog.getByText("You Don't Know JS Yet (book series)"),
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
        const blog = await page.locator('.blog');
        await viewBlog(blog);
        expect(blog.getByRole('button', { name: 'remove' })).not.toBeVisible();
      });
    });
  });

  test('Blogs are ordered by their like count correctly', async ({ page }) => {
    // kirjaudu sisään
    await loginAction(page, 'mluukkai', 'salainen');
    await page.getByText('Matti Luukkainen logged in').waitFor();

    // luo kolme blogia
    await createBlog(page, {
      title: 'Error Handling in Node.js',
      author: 'Smashing Magazine',
      url: 'https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/',
    });
    await createBlog(page, {
      title: 'Node.js Best Practices',
      author: 'GitHub - goldbergyoni',
      url: 'https://github.com/goldbergyoni/nodebestpractices',
    });
    await createBlog(page, {
      title: 'Async functions',
      author: 'MDN Web Docs',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function',
    });

    const blogs = page.locator('.blog');

    // tykkää blogeista eri määrät
    const blog1 = await blogs.getByText('Error Handling in Node.js');
    const blog2 = await blogs.getByText('Node.js Best Practices');
    const blog3 = await blogs.getByText('Async functions');
    await viewAndLikeBlog(blog1, 2);
    await viewAndLikeBlog(blog2, 1);
    await viewAndLikeBlog(blog3, 3);

    // tarkista, että järjestys on oikea
    await expect(blogs.nth(0)).toContainText('Async functions');
    await expect(blogs.nth(1)).toContainText('Error Handling in Node.js');
    await expect(blogs.nth(2)).toContainText('Node.js Best Practices');
  });
});
