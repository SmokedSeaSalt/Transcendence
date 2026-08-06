import React from "react";
import { Link } from "react-router-dom";

export default function TermsOfService() {
	return (
		<main
			aria-labelledby="tos-heading"
			className="text-text bg-background width-800 p-4 max-w-[800px] mx-auto"
		>
			<h1
				className="text-text-colored font-bold text-4xl mb-1"
				id="tos-heading"
			>
				Terms of Service
			</h1>

			<p>Last updated: 2026-07-08</p>

			<section aria-labelledby="intro">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="intro">
					Introduction
				</h2>
				<p>
					Welcome to Transcendence Typeracer. These Terms of Service ("Terms")
					govern your access to and use of our multiplayer typing game and
					related services (the "Service"). By using the Service you agree to be
					bound by these Terms.
				</p>
			</section>

			<section aria-labelledby="accounts">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="accounts">
					Accounts & Authentication
				</h2>
				<p>
					You must register an account to use certain features (profile and game
					history). Keep your credentials secure. You are responsible for
					activity that occurs under your account.
				</p>
			</section>

			<section aria-labelledby="user-conduct">
				<h2
					className="text-text-colored font-bold text-2xl mb-1"
					id="user-conduct"
				>
					User Conduct
				</h2>
				<ul>
					<li>Use the Service lawfully and respectfully.</li>
					<li>
						No cheating, exploiting, or using automated scripts to gain unfair
						advantage.
					</li>
					<li>
						No harassment, hate speech, threats, or doxxing of other players.
					</li>
				</ul>
			</section>

			<section aria-labelledby="multiplayer">
				<h2
					className="text-text-colored font-bold text-2xl mb-1"
					id="multiplayer"
				>
					Multiplayer & Matches
				</h2>
				<p>
					Matches are live and may be moderated. The operator may remove or
					disqualify players who violate these Terms or behave abusively.
					Results and leaderboard entries may be adjusted or revoked to maintain
					fair play.
				</p>
			</section>

			<section aria-labelledby="content">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="content">
					Content & Intellectual Property
				</h2>
				<p>
					You retain ownership of any content you submit (profiles), but by
					submitting you grant us a license to host and display it within the
					Service. The game code, branding, and provided game content are owned
					by the project authors.
				</p>
			</section>

			<section aria-labelledby="privacy">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="privacy">
					Privacy
				</h2>
				<p>
					<span>
						We collect account and gameplay data needed to run the Service. See
						our See our{" "}
					</span>
					<Link to="/privacy-policy">Privacy Policy</Link>
					<span>
						{" "}
						for details on what is collected, how it is used, and your rights.
					</span>
				</p>
			</section>

			<section aria-labelledby="disclaimer">
				<h2
					className="text-text-colored font-bold text-2xl mb-1"
					id="disclaimer"
				>
					Disclaimer & Liability
				</h2>
				<p>
					The Service is provided "as is." We do not guarantee uninterrupted or
					error-free operation. To the maximum extent permitted by law, the
					project authors are not liable for damages arising from use of the
					Service.
				</p>
			</section>

			<section aria-labelledby="termination">
				<h2
					className="text-text-colored font-bold text-2xl mb-1"
					id="termination"
				>
					Termination
				</h2>
				<p>
					<span>
						We may suspend or terminate access for violations of these Terms or
						for operational reasons. You may delete your account according to
						the instructions in the{" "}
					</span>
					<Link to="/privacy-policy">Privacy Policy</Link>.
				</p>
			</section>

			<section aria-labelledby="changes">
				<h2 className="text-text-colored font-bold text-2xl mb-1" id="changes">
					Changes to Terms
				</h2>
				<p>
					We may update these Terms. Significant changes will be posted with a
					new "Last updated" date. Continued use after changes constitutes
					acceptance.
				</p>
			</section>
		</main>
	);
}
