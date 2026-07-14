import { useState } from "react";

export default function ApiKeyDisplay({ apikey }: { apikey: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(apikey);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-2 text-sm text-orange-600 cursor-pointer break-all text-left"
    >
      {copied ? "Copied!" : apikey}
    </button>
  );
}