import Button from "../../components/Button";
import { useApiKey } from "./useApiKey";

export default function ApiKeyButton() {
	const { getapikey, loading, error } = useApiKey();

	const clickapikey = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault(); // prevent default page reload
		const apikey = await getapikey();
		console.log(apikey); //replace for popup later
	};

	return (
		<section>
			<div style={{width: "15%", padding: "1em"}}>
				<Button onClick={clickapikey} type={"button"} loading={loading}>Generate Api Key</Button>
			</div>
		</section>
	);
}
