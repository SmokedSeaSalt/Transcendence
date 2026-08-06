import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className = "", ...props }: InputProps) {
	return (
		<input
			className={`
				w-full
				rounded-md
				bg-background-secondary
				px-3
				py-2
				text-text
				placeholder:text-text-secondary
				outline-none
				focus:ring
				focus:ring-highlight-colored
				${className}
			`}
			{...props}
		/>
	);
}
