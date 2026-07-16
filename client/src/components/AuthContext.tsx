import { createContext, useContext } from "react";
import { jsonUser, userAuth } from "../hooks/userAuth";

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