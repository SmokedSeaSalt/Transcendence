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
			className={`font-bold inline-flex h-full items-center justify-center rounded-md bg-button-main px-4 py-2 text-text transition hover:bg-button-hover disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
			{...props}
		>
			{loading ? "Loading…" : children}
		</button>
	);
}
