import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import CallHealth from "./pages/CallHealthy";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<main className="flex-1">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/terms-of-service" element={<TermsOfService />} />
						<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						<Route path="/" element={<CallHealth />} />
					</Routes>
				</main>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
