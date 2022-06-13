import { useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";

export const useInput = (initalValue) => {
	const [value, setValue] = useState(initalValue);
	const handler = useCallback((event) => {
		setValue(event.target.value);
	}, [value]);
	return [value, handler, setValue];
};

export const useDidUpdateEffect = (fn, defs) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        if(!isMounted) {
            setIsMounted(true);
            return;
        }
        fn();
    },defs)
};
