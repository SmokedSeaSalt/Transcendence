import { Children, createContext, useContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { userAuth, type jsonUser } from "./hooks/userAuth";
import CallHealth from "./pages/CallHealthy";
import Login from "./pages/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

export interface authContextType {
	currentUser: jsonUser | null;
	loggedIn: boolean;
	setCurrentUser: (currentUser: jsonUser | null) => void;
	refresh() : void;
	setLoggedIn : (loggedIn: boolean) => void;
}

export const AuthContext = createContext<authContextType | null>({
	currentUser: {name: "default name", email: "email addr", createdAt: "date"},
	loggedIn: false,
	setCurrentUser: () => {},
	refresh: () => {},
	setLoggedIn: () => {},
});

// provides functions for the AuthContext
export const AuthProvider = ({ children }: {children: React.ReactNode}) => {
	const [ userInfo, loading ] = userAuth();
	var [currentUser, setCurrentUser] = useState<jsonUser | null>(userInfo);
	var [loggedIn, setLoggedIn] = useState<boolean>(false);
	// todo: wait for loading to not be null ? -> doesn't seem to have any influence
	if (loading)
		console.log("In authprovider, loading is true.");
	console.log("pre-refresh, user without setting is:", userInfo);
	// setCurrentUser(userInfo); // not allowed, too many renders
	currentUser = userInfo;
	if (userInfo !== null)
		loggedIn = true;
	const refresh = () => {
		setCurrentUser(userInfo);
		console.log("now running refresh, setting user to :", userInfo);
	}
	return (
		<AuthContext value={{currentUser, loggedIn, setCurrentUser, refresh, setLoggedIn}}>
			{children}
		</AuthContext>
	)
}

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	console.log("useAuthContext being used.");
	if (!context)
	{
		console.log("error useAuthContext");
		throw new Error("useAuthContext used inappropriately");
		// todo: catch somewhere?
	}
	return context;
}

export default function App() {
	return (
		<BrowserRouter>
			<div className="min-h-screen flex flex-col">
				<AuthProvider>
					<Header />
					<main className="flex-1">
						<Routes>
							<Route path="/login" element={<Login />} />
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
