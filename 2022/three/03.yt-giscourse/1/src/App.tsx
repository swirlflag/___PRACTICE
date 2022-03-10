// import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Page1 from '@/pages/Page1.jsx';
import Page2 from '@/pages/Page2.jsx';
import Page3 from '@/pages/Page3.jsx';
import Page4 from '@/pages/Page4.jsx';

const App = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/1" element={<Page1 />}></Route>
                <Route path="/2" element={<Page2 />}></Route>
                <Route path="/3" element={<Page3 />}></Route>
                <Route path="/4" element={<Page4 />}></Route>
            </Routes>
		</BrowserRouter>
	);
};

export default App;
