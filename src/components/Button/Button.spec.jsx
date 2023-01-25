import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe('<Button />', () => {
	it('shoul render the button with the text "Load more"', () => {

    const fn = jest.fn();
    render(<Button text="Load more" disabled={false} onClick={fn} />);
		expect.assertions(1);
		const button = screen.getByRole('button', { name: /load more/i });
		expect(button).toBeInTheDocument();
	});
	//
	it('shoul call button function on button click', () => {

		const fn = jest.fn();
		render(<Button text="Load more" onClick={fn} />);

		const button = screen.getByRole('button', { name: /load more/i });
		// fireEvent.click(button);
		userEvent.click(button);
		// expect(fn).toHaveBeenCalled();
		expect(fn).toHaveBeenCalledTimes(1);
	})
	//
	it('shoul be disabled when disabled is true', () => {

    const fn = jest.fn();
		render(<Button text="Load more" disabled={true} onClick={fn} />);
		const button = screen.getByRole('button', { name: /load more/i });
		expect(button).toBeDisabled();
	});

	it('should match snapshot', () => {

    const fn = jest.fn();
		const { container } = render(<Button text="Load more" onClick={fn}/>);
		expect(container).toMatchSnapshot();
	});
});
