import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-white border-t border-gray-200 mt-8">
			<div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600">
				<div>© {new Date().getFullYear()} Transcendence</div>
				<div className="mt-3 sm:mt-0 flex items-center space-x-4">
					<Link
						to="/privacy-policy"
						className="text-gray-700 hover:text-blue-600"
					>
						Privacy Policy
					</Link>
					<Link
						to="/terms-of-service"
						className="text-gray-700 hover:text-blue-600"
					>
						Terms of Service
					</Link>
				</div>
			</div>
		</footer>
	);
}
