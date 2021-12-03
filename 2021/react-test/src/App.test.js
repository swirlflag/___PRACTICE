import { render, screen } from "@testing-library/react";
import App from "./App";

describe("화면 확인", () => {
	render(<App />);

    it('카운터가 0부터 시작됨', () => {
        // testid로 접근
        const counterElement = screen.getByTestId('counter');
        // counter가 0부터인지 테스트
        expect(counterElement).toHaveTextContent(0);
    });
});
