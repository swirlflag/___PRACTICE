import { render, screen } from '@testing-library/react';
import App from './App';

describe('화면 확인' , () => {
    render(<App />);

    it('텍스트 확인 - "Learn React"', () => {
        const { textContent } = screen.queryByText(/Learn React/i);
        expect(textContent).toBe('Learn React');
    });
    // it('텍스트 확인 - "hohoho"', async () => {
    //     const text = await screen.findByText(/hohoho/i);
    //     expect(text.textContent).toBe('hohoho');
    //     console.log(text)
    // });
})


