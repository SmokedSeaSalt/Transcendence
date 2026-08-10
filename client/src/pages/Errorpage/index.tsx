import { Link } from "react-router-dom";
import cat from "../../assets/404.jpg";

export default function Errorpage() {
	return (
		<main>
			<div className="flex flex-col items-center justify-center text-center">
				<h1 className="text-text-colored font-bold py-2 text-4xl mb-1">
					Page not found
				</h1>
				<img
					src={cat}
					alt="404 cat"
					width="1200"
					height="1200"
					className="w-full max-w-md h-auto"
				/>
			</div>
		</main>
	);
}
