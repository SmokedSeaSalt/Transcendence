import { Children, createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { type jsonUser, userAuth } from "./hooks/userAuth";
import CallHealth from "./pages/CallHealthy";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Profile from "./pages/Profile";
import TermsOfService from "./pages/TermsOfService";

//create context type to mathc return object of userAuth
export interface authContextType {
	currentUser: jsonUser | null;
	loading: boolean;
	updateLoggedinUser: () => Promise<void>;
}

export const AuthContext = createContext<authContextType | null>(null);

// provides functions for the AuthContext
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	//deconstruct returned userAuth object.
	const { userData, loading, refetch } = userAuth();

	//create object to get all this info from the same context value
	const value: authContextType = {
		currentUser: userData,
		loading,
		//do we want separate loggedIn bool so we don't need to check currentUser every time?
		//if we do this typescript probably still will complain that currentUser can be null and is not checked.
		//so maybe without is acrually cleaner?
		updateLoggedinUser: refetch,
	};

	return <AuthContext value={value}>{children}</AuthContext>;
};

//helper wrapper needed for typescript
export const useAuthContext = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext used inappropriately");
		// todo: catch somewhere?
	}
	return context;
};

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
							<Route path="/" element={<CallHealth />} />
						</Routes>
					</main>
				</AuthProvider>
				<Footer />
			</div>
		</BrowserRouter>
	);
}
