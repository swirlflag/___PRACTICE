import { render, screen } from "@testing-library/react";
import App from "./App";

describe("화면 확인", () => {
	it("카운터가 0부터 시작됨", () => {
		render(<App />);
		// testid로 접근
		const counterElement = screen.getByTestId("counter");
		// counter가 0부터인지 테스트
		expect(counterElement).toHaveTextContent(0);
	});

	it("마이너스 버튼이 정확한 텍스트를 가짐", () => {
		render(<App />);
		const minusElement = screen.getByTestId("minus-button");
		expect(minusElement).toHaveTextContent("-");
	});

	it("플러스 버튼이 정확한 텍스트를 가짐" , () => {
        render(<App />);
		const plusElement = screen.getByTestId("plus-button");
		expect(plusElement).toHaveTextContent("+");
    });
});
