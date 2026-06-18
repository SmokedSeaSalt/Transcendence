import express from "express";

const app = express();
const port = Number(process.env.PORT ?? 8000);

app.get("/server/hello", (_req, res) => {
  res.send("hello");
});

app.listen(port, () =>           {
  console.log(`Server listening on http://localhost:${port}`);
});