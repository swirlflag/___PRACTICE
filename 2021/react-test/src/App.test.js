import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
    render(<App />);
    let linkElement = screen.getByText(/learn react/i);
    linkElement = screen.queryByText(/learn react/i);
    // linkElement = await screen.findByText(/hohoho/i);
    expect(linkElement).toBeInTheDocument();

    // expect(linkElement).toBe();
    console.log(linkElement);

});
