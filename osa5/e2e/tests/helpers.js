const createUser = async (req, name, username, password) => {
  await req.post('/api/users', { data: { name, username, password } });
};

const loginAction = async (page, username, password) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const openBlogForm = async (page) => {
  await page.getByRole('link', { name: 'new blog' }).click();
  const addButton = await page.getByRole('button', { name: 'add' });
  // odota, että lomake aukeaa
  await addButton.waitFor();
};

const fillAndSubmitBlogForm = async (page, inputs) => {
  // täytä lomake
  await page.getByLabel('title').fill(inputs.title);
  await page.getByLabel('author').fill(inputs.author);
  await page.getByLabel('url').fill(inputs.url);
  // lähetä lomake
  await page.getByRole('button', { name: 'add' }).click();
};

const createBlog = async (page, inputs) => {
  await page.getByRole('link', { name: 'new blog' }).click();
  await fillAndSubmitBlogForm(page, inputs);
  // odota, että blogi ilmaantuu listalle
  await page
    .locator('li')
    .getByText(`${inputs.title} by ${inputs.author}`)
    .waitFor();
};

const viewBlog = async (blog) => {
  await blog.getByRole('button', { name: 'view' }).click();
  const hideButton = await blog.getByRole('button', { name: 'hide' });
  // odota, että blogi aukeaa
  await hideButton.waitFor();
};

const viewAndLikeBlog = async (blog, times) => {
  await viewBlog(blog);
  const likeButton = await blog.getByRole('button', { name: 'like' });
  // oletetaan helpotukseksi, että tykkäykset lähtevät nollasta
  for (let i = 0; i < times; i++) {
    await likeButton.click();
    await blog.getByText(`likes ${i + 1}`).waitFor();
  }
};

module.exports = {
  createUser,
  loginAction,
  openBlogForm,
  fillAndSubmitBlogForm,
  createBlog,
  viewBlog,
  viewAndLikeBlog,
};
