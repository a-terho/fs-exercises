import { vi, describe, beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Blog from './Blog';

describe('<Blog />', () => {
  const user = { username: 'a-terho', name: 'A. Terho' };
  const blog = {
    title: 'A complete guide to JavaScript closures',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/javascript-closures-explained/',
    likes: 410,
    user,
  };

  let onLikeHandler = null;
  let onRemoveHandler = null;
  beforeEach(() => {
    // nollaa mock handlerit ennen testejä
    onLikeHandler = vi.fn();
    onRemoveHandler = vi.fn();
    render(
      <Blog
        user={user}
        blog={blog}
        onLike={onLikeHandler}
        onRemove={onRemoveHandler}
      />,
    );
  });

  test('initially renders only title and author', () => {
    // etsi renderöityvä tekstiosuus oikeassa muodossa DOM:sta
    const headerText = screen.getByText(`${blog.title} ${blog.author}`);
    expect(headerText).toBeVisible();

    // etsi myös elementtejä, joiden ei pitäisi renderöityä
    const urlText = screen.queryByText(blog.url);
    const likesText = screen.queryByText(`likes ${blog.likes}`);
    const userText = screen.queryByText(user.name);
    const removeButton = screen.queryByText('remove');
    expect(urlText).toBeNull();
    expect(likesText).toBeNull();
    expect(userText).toBeNull();
    expect(removeButton).toBeNull();
  });

  test('renders all info after pressing view button', async () => {
    const client = userEvent.setup();

    // avaa blogin tiedot
    const viewButton = screen.getByText('view');
    await client.click(viewButton);

    // etsi kaikki oletetusti näkyvät ja renderöityvät elementit
    const headerText = screen.getByText(`${blog.title} ${blog.author}`);
    const urlText = screen.getByText(blog.url);
    const likesText = screen.getByText(`likes ${blog.likes}`);
    const userText = screen.getByText(user.name);
    const removeButton = screen.getByText('remove');
    expect(headerText).toBeVisible();
    expect(urlText).toBeVisible();
    expect(likesText).toBeVisible();
    expect(userText).toBeVisible();
    expect(removeButton).toBeVisible();
  });

  test('when like button is pressed twice, handler is triggered twice', async () => {
    const client = userEvent.setup();

    // avaa ensin blogin tiedot
    const viewButton = screen.getByText('view');
    await client.click(viewButton);

    // paina sitten tykkäysnappia kahdesti
    const likeButton = screen.getByText('like');
    await client.click(likeButton);
    await client.click(likeButton);

    expect(onLikeHandler.mock.calls).toHaveLength(2);
  });
});
