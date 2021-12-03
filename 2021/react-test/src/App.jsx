import { memo , useState } from "react";
import "./App.css";

const App = memo(() => {
    const [ counter, setCounter ] = useState(0);

	return (
		<div className="App">
			<header id="app-header">
				<h3 data-testid="counter">
                    {counter}
                </h3>
			</header>
		</div>
	);
});

export default App;
