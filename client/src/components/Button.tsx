import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
	children: ReactNode;
};

export default function Button({
	loading = false,
	children,
	className = "",
	disabled,
	type = "submit",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled || loading}
			className={`inline-flex items-center justify-center rounded-md bg-orange-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
			{...props}
		>
			{loading ? "Loading…" : children}
		</button>
	);
}
