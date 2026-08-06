import { Link } from "react-router-dom";

export default function Footer() {
	return (
		<footer className="bg-header border-t border-highlight-white mt-8">
			<div className="px-4 py-2 flex flex-col sm:flex-row items-center justify-between text-sm text-text">
				<div>© {new Date().getFullYear()} Transcendence</div>
				<div className="mt-3 sm:mt-0 flex items-center space-x-4">
					<Link
						to="/privacy-policy"
						className="text-hyperlink hover:hyperlink-hover"
					>
						Privacy Policy
					</Link>
					<Link
						to="/terms-of-service"
						className="text-hyperlink hover:hyperlink-hover"
					>
						Terms of Service
					</Link>
				</div>
			</div>
		</footer>
	);
}
