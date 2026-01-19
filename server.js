const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
  const { email } = req.body;

  const python = spawn(process.platform === "win32" ? "py" : "python3", [
    "predict.py",
    email,
  ]);

  let result = "";

  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  python.on("close", () => {
    res.json(JSON.parse(result));
  });
});

app.listen(5000, () => {
  console.log("Node server running on http://localhost:5000");
});
