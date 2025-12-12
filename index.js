import express from "express";
import cors from "cors";
import { signBuilderRequest } from "@polymarket/builder-signing";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign", async (req, res) => {
  try {
    const { path, method, body } = req.body;

    const headers = signBuilderRequest({
      apiKey: process.env.BUILDER_API_KEY,
      secret: process.env.BUILDER_API_SECRET,
      passphrase: process.env.BUILDER_API_PASSPHRASE,
      path,
      method,
      body
    });

    res.json(headers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Builder signing server running");
});
