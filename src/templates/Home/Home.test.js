import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import Home from ".";

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from "@testing-library/user-event";

const handles = [

  rest.get('https://jsonplaceholder.typicode.com*', async (resq, res, ctx) => {
    return res(ctx.json(
      [
        {
          userId: 1,
          id: 1,
          title: "title 1 ",
          body: "body 1",
          url: "img1.png"
        },
        {
          userId: 2,
          id: 2,
          title: "title 2",
          body: "body 2",
          url: "img2.png"
        },
        {
          userId: 3,
          id: 3,
          title: "title 3",
          body: "body 3",
          url: "img3.png"
        }
      ]));
  })
];

const server = setupServer(...handles);


describe('<Home />', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /title/i });
    expect(images).toHaveLength(3);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    expect.assertions(7);
    await waitForElementToBeRemoved(noMorePosts);
    //screen.debug();
    //expect(1).toBe(1);
    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /title 4/i })).not.toBeInTheDocument();

    userEvent.clear(search, 'post do not exist')
    expect(screen.getByRole('heading', { name: /title 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /title 2/i })).toBeInTheDocument();

    userEvent.type(search, 'blabal')
    expect(screen.getByText('Não existem posts')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts');

    //expect.assertions(1);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(screen.getByRole('heading', { name: /title 3/i })).toBeInTheDocument();

    expect(button).toBeDisabled();

  });


});
