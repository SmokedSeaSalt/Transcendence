import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import GamePage from "./pages/GamePage";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import TermsOfService from "./pages/TermsOfService";

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<AuthProvider>
					<Header />
					<main className="flex-1">
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/terms-of-service" element={<TermsOfService />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							<Route path="/" element={<GamePage />} />
						</Routes>
					</main>
				</AuthProvider>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
