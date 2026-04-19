import { vi, describe, beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import Blog from './Blog';

vi.mock('../hooks/useBlogs', () => ({ default: vi.fn() }));
vi.mock('../hooks/useUser', () => ({ default: vi.fn() }));
vi.mock('react-router', () => ({ useMatch: vi.fn() }));

describe('<Blog />', async () => {
  const user = { username: 'a-terho', name: 'A. Terho', id: 'abc123' };
  const otherUser = { username: 'b-terho', name: 'B. Terho', id: 'cde456' };
  const blog = {
    title: 'A complete guide to JavaScript closures',
    author: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org/news/javascript-closures-explained/',
    likes: 410,
    id: 'fgh789',
    user,
  };

  const onLikeHandler = vi.fn();
  const onRemoveHandler = vi.fn();
  const useBlogs = await import('../hooks/useBlogs');
  const useUser = await import('../hooks/useUser');
  const { useMatch } = await import('react-router');

  beforeEach(() => {
    vi.clearAllMocks();

    // mockataan komponentin käyttämien hookien tulokset
    useBlogs.default.mockReturnValue({ isPending: false, blogs: [blog] });
    useMatch.mockReturnValue({ params: { id: blog.id } });
  });

  test('renders all info for logged out user, but no buttons', () => {
    useUser.default.mockReturnValue({ user: null });
    render(
      <Blog blog={blog} onLike={onLikeHandler} onRemove={onRemoveHandler} />,
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
    useUser.default.mockReturnValue({ user: otherUser });
    render(
      <Blog blog={blog} onLike={onLikeHandler} onRemove={onRemoveHandler} />,
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
    useUser.default.mockReturnValue({ user: user });
    render(
      <Blog blog={blog} onLike={onLikeHandler} onRemove={onRemoveHandler} />,
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
