import type React from "react";
import { useState } from "react";
import SetNameButton from "../../components/Button";
import { setDisplayNameSchema } from "./schemas";
import { useSetDisplayName } from "./useSetDisplayName";

export default function DisplayNameForm() {
	const [displayName, setDisplayName] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { storeDisplayName, loading, error } = useSetDisplayName();

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		console.log("Submitted something to display name!");
		e.preventDefault(); // prevent default page reload
		const result = setDisplayNameSchema.safeParse({ displayName });
		if (!result.success) {
			const errors: Record<string, string> = {};
			result.error.issues.forEach((err) => {
				const field = err.path[0] as string;
				errors[field] = err.message;
			});
			setFieldErrors(errors);
			return;
		}
		setFieldErrors({});
		await storeDisplayName(displayName);
	};

	return (
		<section style={{ flex: 1, padding: 24 }}>
			<h2 id="login-title">Stay a guest</h2>
			<form
				onSubmit={submit}
				style={{ display: "flex", flexDirection: "column", gap: 8 }}
			>
				<div>
					<input
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						placeholder="Display name"
					/>
					{fieldErrors.displayName && (
						<div role="alert" style={{ color: "red" }}>
							{fieldErrors.displayName}
						</div>
					)}
				</div>
				{error ? (
					<div role="alert" style={{ color: "red" }}>
						{error}
					</div>
				) : null}
				<SetNameButton loading={loading}>Set display name</SetNameButton>
			</form>
		</section>
	);
}
