import { useEffect } from "react";

export function useEscapeKey(callback: () => void, enabled = true) {
	useEffect(() => {
		if (!enabled) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				callback();
			}
		};

		window.addEventListener("keydown", handleEscape);

		return () => {
			window.removeEventListener("keydown", handleEscape);
		};
	}, [callback, enabled]);
}
