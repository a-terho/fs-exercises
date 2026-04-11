const createUser = async (req, name, username, password) => {
  await req.post('/api/users', { data: { name, username, password } });
};

const loginAction = async (page, username, password) => {
  await page.getByLabel('username').fill(username);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: 'login' }).click();
};

const fillAndSubmitBlogForm = async (page, inputs) => {
  // täytä lomake
  await page.getByLabel('title').fill(inputs.title);
  await page.getByLabel('author').fill(inputs.author);
  await page.getByLabel('url').fill(inputs.url);
  // lähetä lomake
  await page.getByRole('button', { name: 'add' }).click();
};

const findFirstLikes = async (page) => {
  const content = await page
    .getByText(/likes (\d+)/)
    .first()
    .innerText();
  return getLikesFromContent(content);
};

const getLikesFromContent = (content) => {
  const likes = content?.split(' ')[1];
  return Number(likes);
};

module.exports = {
  createUser,
  loginAction,
  fillAndSubmitBlogForm,
  findFirstLikes,
};
