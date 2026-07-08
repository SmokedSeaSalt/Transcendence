import { BrowserRouter, Route, Routes } from "react-router-dom";
import CallHealth from "./pages/CallHealthy";
import Login from "./pages/Login";

export default function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<CallHealth />} />
			</Routes>
		</BrowserRouter>
	);
}
