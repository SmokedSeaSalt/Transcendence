import { useState } from "react";
import Button from "../../components/Button";
import Popup from "../../components/Popup";
import ApiKeyDisplay from "./ApiKeyDisplay";
import { useApiKey } from "./useApiKey";

export default function ApiKeyButton() {
	const { getapikey, loading, error } = useApiKey();
	const [open, setOpen] = useState<boolean>(false);
	const [apikey, setApikey] = useState<string>("");

	const clickApikey = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // prevent default page reload
		setApikey(await getapikey());
		if (error) {
			setApikey("Error while generating API key");
		}
		setOpen(true);
	};

	return (
		<div className="p-1">
			<Button onClick={clickApikey} type={"button"} loading={loading}>
				Generate Api Key
			</Button>

			<Popup open={open} onClose={() => setOpen(false)}>
				<h3 className="text-text-colored font-bold text-xl">Generated key</h3>
				<p className="mt-2 text-sm text-text">
					Save this key as you will only see it once!
				</p>
				<ApiKeyDisplay apikey={apikey} />
			</Popup>
		</div>
	);
}
