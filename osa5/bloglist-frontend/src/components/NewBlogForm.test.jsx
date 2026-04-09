import { vi, describe, beforeEach, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import NewBlogForm from './NewBlogForm';

describe('<NewBlogForm />', () => {
  const inputs = {
    title: "You Don't Know JS Yet (book series)",
    author: 'Kyle Simpson',
    url: 'https://github.com/getify/You-Dont-Know-JS',
  };

  let onBlogPostHandler = null;
  beforeEach(() => {
    // nollaa mock handler ennen testejä
    onBlogPostHandler = vi.fn();
    render(<NewBlogForm onBlogPost={onBlogPostHandler} />);
  });

  test('correct values are passed to onBlogPost handler when called', async () => {
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
    const args = onBlogPostHandler.mock.calls[0][0];
    expect(args).toStrictEqual(inputs);
  });
});
