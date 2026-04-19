import { vi, describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Blog from './Blog';
import { UserContext } from './UserProvider';

describe('<Blog />', () => {
  const user = { username: 'a-terho', name: 'A. Terho' };
  const otherUser = { username: 'b-terho', name: 'B. Terho' };
  const blog = {
    title: 'A complete guide to JavaScript closures',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/javascript-closures-explained/',
    likes: 410,
    user,
  };

  const onLikeHandler = vi.fn();
  const onRemoveHandler = vi.fn();

  test('renders all info for logged out user, but no buttons', () => {
    render(
      <UserContext value={{ user: null }}>
        <Blog blog={blog} onLike={onLikeHandler} onRemove={onRemoveHandler} />
      </UserContext>,
    );

    // etsi oletetusti renderöityvät elementit DOM:sta
    expect(screen.getByText(`${blog.author}: ${blog.title}`)).toBeVisible();
    expect(screen.getByText(blog.url)).toBeVisible();
    expect(screen.getByText(`likes ${blog.likes}`)).toBeVisible();
    expect(screen.getByText(user.name)).toBeVisible();

    // etsi napit joiden ei pitäisi renderöityä
    expect(screen.queryByText('remove')).toBeNull();
    expect(screen.queryByText('like')).toBeNull();
  });

  test('renders only like button for user that has not created the blog', () => {
    render(
      <UserContext value={{ user: otherUser }}>
        <Blog blog={blog} onLike={onLikeHandler} onRemove={onRemoveHandler} />
      </UserContext>,
    );

    // etsi oletetusti renderöityvät elementit DOM:sta
    expect(screen.getByText(`${blog.author}: ${blog.title}`)).toBeVisible();
    expect(screen.getByText(blog.url)).toBeVisible();
    expect(screen.getByText(`likes ${blog.likes}`)).toBeVisible();
    expect(screen.getByText(user.name)).toBeVisible();
    expect(screen.getByText('like')).toBeVisible();

    // etsi nappi, jonka ei pitäisi renderöityä
    expect(screen.queryByText('remove')).toBeNull();
  });

  test('renders both like and remove buttons for creator of the blog', () => {
    render(
      <UserContext value={{ user }}>
        <Blog blog={blog} onLike={onLikeHandler} onRemove={onRemoveHandler} />
      </UserContext>,
    );

    // etsi oletetusti renderöityvät elementit DOM:sta
    expect(screen.getByText(`${blog.author}: ${blog.title}`)).toBeVisible();
    expect(screen.getByText(blog.url)).toBeVisible();
    expect(screen.getByText(`likes ${blog.likes}`)).toBeVisible();
    expect(screen.getByText(user.name)).toBeVisible();
    expect(screen.getByText('like')).toBeVisible();
    expect(screen.getByText('remove')).toBeVisible();
  });
});
