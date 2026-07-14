import { useState } from "react";
import Button from "../../components/Button";
import { useApiKey } from "./useApiKey";
import Popup from "../../components/Popup";
import ApiKeyDisplay from "./ApiKeyDisplay";

export default function ApiKeyButton() {
	const { getapikey, loading, error } = useApiKey();
	const [open, setOpen] = useState<boolean>(false);
	const [apikey, setApikey] = useState<string>("");

	const clickapikey = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // prevent default page reload
		//setApikey(await getapikey());
		setApikey("thisisateststring");
		setOpen(true);
		console.log(apikey); //replace for popup later
	};

	return (
			<div style={{padding: "1em"}}>
				<Button onClick={clickapikey} type={"button"} loading={loading}>Generate Api Key</Button>

			<Popup open={open} onClose={() => setOpen(false)}>
				<h3 className="text-base font-semibold text-slate-400">Generated key</h3>
				<p className="mt-2 text-sm text-slate-400">
					Save this key as you will only see it once!
				</p>
				<ApiKeyDisplay apikey={apikey} />
			</Popup>

			</div>
	);
}
