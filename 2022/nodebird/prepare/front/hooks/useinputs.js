import { useState, useCallback } from 'react';

export default (initalValue) => {
    const [ value, setValue ] = useState(initalValue);
    const handler = useCallback((event) => {
        setValue(event.target.value);
    },[]);
    return [value, handler]
}

// const onChangeId = useCallback((event) => {
//     setId(event.target.value);
// }, []);

// const onChangePassword = useCallback((event) => {
//     setPassword(event.target.value);
// }, []);