import { useState } from "react";

export default function ApiKeyDisplay({ apikey }: { apikey: string }) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		await navigator.clipboard.writeText(apikey);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="mt-2">
			<button
				type="button"
				onClick={handleCopy}
				className="p-1 rounded-md text-sm text-text-colored font-bold bg-background-secondary cursor-pointer break-all text-left"
			>
				{apikey}
			</button>
			<div
				className={`mt-1 text-sm text-green-600 ${
					copied ? "visible" : "invisible"
				}`}
			>
				Copied!
			</div>
		</div>
	);
}
