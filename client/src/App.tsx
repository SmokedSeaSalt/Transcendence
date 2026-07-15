import { Children, createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import type { jsonUser } from "./hooks/userAuth";
import CallHealth from "./pages/CallHealthy";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import TermsOfService from "./pages/TermsOfService";

export interface userContextType {
	currentUser: jsonUser | null;
	setCurrentUser: React.Dispatch<React.SetStateAction<jsonUser | null>>;
}

export const CurrentUserContext = createContext<userContextType | null>(null);

export function useCurrentUserContext() {
	const context = useContext(CurrentUserContext);
	if (!context) throw Error("useCurrentUserContext error");
	return context;
}

export default function App() {
	const [currentUser, setCurrentUser] = useState<jsonUser | null>(null);
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<CurrentUserContext value={{ currentUser, setCurrentUser }}>
					<Header />
					<main className="flex-1">
						<Routes>
							<Route path="/login" element={<Login />} />
							<Route path="/profile" element={<Profile />} />
							<Route path="/terms-of-service" element={<TermsOfService />} />
							<Route path="/privacy-policy" element={<PrivacyPolicy />} />
							<Route path="/" element={<CallHealth />} />
						</Routes>
					</main>
				</CurrentUserContext>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
