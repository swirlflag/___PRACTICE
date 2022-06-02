import { useState, useCallback } from "react";

export const useInput = (initalValue) => {
	const [value, setValue] = useState(initalValue);
	const handler = useCallback((event) => {
		setValue(event.target.value);
	}, []);
	return [value, handler, setValue];
};
