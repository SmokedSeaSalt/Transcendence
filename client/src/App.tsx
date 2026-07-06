import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import CallHealth from "./pages/CallHealthy";


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
