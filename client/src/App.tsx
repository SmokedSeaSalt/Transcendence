import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    const response = await fetch("/hello");
    const text = await response.text();
    setMessage(text);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>React + Express</h1>
      <button type="button" onClick={handleClick}>
        Call /hello
      </button>
      {message ? <p>{message}</p> : null}
    </main>
  );
}