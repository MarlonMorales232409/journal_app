import React from "react";
import { AppRouter } from "./routers/AppRouter";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

export const JournalApp = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</Provider>
	);
};
