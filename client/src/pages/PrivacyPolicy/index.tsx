import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
	return (
		<main
			aria-labelledby="pp-heading"
			className="text-text bg-background width-800 p-4 max-w-[800px] mx-auto"
		>
			<h1 className="text-text-colored font-bold text-4xl mb-1" id="pp-heading">
				Privacy Policy
			</h1>
			<p>Last updated: 2026-07-08</p>

			<section aria-labelledby="intro">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="intro">
					Introduction
				</h2>
				<p>
					This Privacy Policy explains how Transcendence ("we", "us", "the
					Service") collects, uses, discloses, and protects information when you
					use our multiplayer typeracer game and related features that require
					user accounts and authentication.
				</p>
			</section>

			<section aria-labelledby="data-collected">
				<h2
					className="text-text-colored font-bold text-2xl mb-1"
					id="data-collected"
				>
					Information We Collect
				</h2>
				<ul>
					<li>
						Account information: email, display name, and any profile data you
						provide when registering.
					</li>
					<li>
						Authentication data: hashed passwords and session tokens necessary
						to manage your login.
					</li>
					<li>
						Gameplay data: match results, scores, leaderboards, and in-game
						actions needed to operate features.
					</li>
					<li>
						Usage & diagnostics: logs, IP address, and performance data for
						troubleshooting and improving the Service.
					</li>
				</ul>
			</section>

			<section aria-labelledby="use">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="use">
					How We Use Information
				</h2>
				<ul>
					<li>
						Provide and maintain your account, multiplayer matches,
						leaderboards, and social features.
					</li>
					<li>Authenticate and secure access to the Service.</li>
					<li>Improve gameplay, detect cheating, and prevent abuse.</li>
				</ul>
			</section>

			<section aria-labelledby="sharing">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="sharing">
					Sharing & Third Parties
				</h2>
				<p>
					We do not sell personal data. We will not share any data with any
					third parties.
				</p>
			</section>

			<section aria-labelledby="cookies">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="cookies">
					Cookies & Local Storage
				</h2>
				<p>
					We use cookies or local storage for session management and to persist
					user preferences. You can manage or clear these via your browser
					settings, but doing so may affect functionality.
				</p>
			</section>

			<section aria-labelledby="security">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="security">
					Security
				</h2>
				<p>
					We implement reasonable technical and organizational measures to
					protect data. However, no system is perfect — we cannot guarantee
					absolute security.
				</p>
			</section>

			<section aria-labelledby="retention">
				<h2
					className="text-text-colored font-bold text-2xl mb-1"
					id="retention"
				>
					Data Retention
				</h2>
				<p>
					We retain account and gameplay data as long as necessary to provide
					the Service and for legitimate business purposes.
				</p>
			</section>

			<section aria-labelledby="rights">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="rights">
					Your Rights
				</h2>
				<p>
					Depending on your jurisdiction, you may have rights to access,
					correct, or delete your personal data, or to restrict or object to
					certain processing. Contact us to exercise those rights.
				</p>
			</section>

			<section aria-labelledby="changes">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="changes">
					Changes to This Policy
				</h2>
				<p>
					We may update this Privacy Policy. Material changes will be posted
					with a new "Last updated" date. Continued use after changes
					constitutes acceptance.
				</p>
			</section>

			<footer className="pt-5">
				<span>Links: </span>
				<Link to="/terms-of-service">Terms of Service</Link>
			</footer>
		</main>
	);
}
