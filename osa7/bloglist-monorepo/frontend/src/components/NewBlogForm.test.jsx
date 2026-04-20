import { vi, describe, beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewBlogForm from './NewBlogForm';

vi.mock('../hooks/useBlogs', () => ({ default: vi.fn() }));
vi.mock('../hooks/useNotify', () => ({ default: vi.fn() }));
vi.mock('react-router', () => ({ useNavigate: vi.fn() }));

describe('<NewBlogForm />', async () => {
  const inputs = {
    title: "You Don't Know JS Yet (book series)",
    author: 'Kyle Simpson',
    url: 'https://github.com/getify/You-Dont-Know-JS',
  };

  const createBlog = vi
    .fn()
    .mockResolvedValue(null)
    .mockRejectedValue({ response: {} });
  const useBlogs = await import('../hooks/useBlogs');
  const useNotify = await import('../hooks/useNotify');

  beforeEach(() => {
    vi.clearAllMocks();
    useBlogs.default.mockReturnValue({ createBlog });
    useNotify.default.mockReturnValue({ showNotification: vi.fn() });

    render(<NewBlogForm />);
  });

  test('correct values are passed to createBlog when called', async () => {
    const user = userEvent.setup();

    const titleInput = screen.getByLabelText('title');
    const authorInput = screen.getByLabelText('author');
    const urlInput = screen.getByLabelText('url');
    const addButton = screen.getByText('add');

    // täytä kentät ja lähetä lomake
    await user.type(titleInput, inputs.title);
    await user.type(authorInput, inputs.author);
    await user.type(urlInput, inputs.url);
    await user.click(addButton);

    // tarkista käsittelijäfunktion saamat arvot
    const args = createBlog.mock.calls[0][0];
    expect(args).toStrictEqual(inputs);
  });
});
