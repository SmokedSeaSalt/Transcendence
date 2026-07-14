import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CallHealth from "./pages/CallHealthy";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { useState , createContext, useContext } from "react";
import { jsonUser } from "./hooks/userAuth";

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
				<CurrentUserContext value={{currentUser, setCurrentUser}}>
					<Header />
					<main className="flex-1">
						<Routes>
							<Route path="/login" element={<Login />} />
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
