import type React from "react";
import { useState } from "react";
import SetNameButton from "../../components/Button";
import { setDisplayNameSchema } from "./schemas";
import { useSetDisplayName } from "./useSetDisplayName";
import Input from "../../components/Input";

export default function DisplayNameForm() {
	const [displayName, setDisplayName] = useState("");
	const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
	const { storeDisplayName, loading, error } = useSetDisplayName();
	const [fieldUpdated, setFieldUpdated] = useState("");

	const submit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default page reload
		const result = setDisplayNameSchema.safeParse({ displayName });
		if (!result.success) {
			const errors: Record<string, string> = {};
			result.error.issues.forEach((err) => {
				const field = err.path[0] as string;
				errors[field] = err.message;
			});
			setFieldErrors(errors);
			setFieldUpdated("");
			return;
		}
		setFieldUpdated("Name set successfully!");
		setTimeout(() => setFieldUpdated(""), 2000);
		setFieldErrors({});
		await storeDisplayName(displayName);
	};

	return (
		<section className="flex-1 p-6">
			<h2 className="text-text-colored font-bold text-2xl mb-1">Stay a guest</h2>
			<form
				onSubmit={submit}
				className="flex flex-col gap-2"
			>
				<div>
					<Input
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						placeholder="Display name"
					/>
					{fieldErrors.displayName && (
						<div role="alert" className="text-red-600">
							{fieldErrors.displayName}
						</div>
					)}
					{fieldUpdated && (
						<div role="alert" className="text-green-600">
							{fieldUpdated}
						</div>
					)}
				</div>
				<SetNameButton loading={loading}>Set display name</SetNameButton>
			</form>
		</section>
	);
}
