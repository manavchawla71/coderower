const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();

const app = express();
const mongouri =
  "mongodb+srv://development:X3TcC8tKnI5JINuR@betalive.9sakb.gcp.mongodb.net/database";
const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

const ConfigurationSchema = new mongoose.Schema({
  configurationId: { type: String, required: true },
  configArray: { type: [[String]], required: true },
  remark: { type: String, default: "" },
});

const Configuration = mongoose.model("Configuration", ConfigurationSchema);

app.post("/api/configurations", async (req, res) => {
  const { configurationId, configArray } = req.body;

  try {
    const newConfig = new Configuration({
      configurationId,
      configArray,
    });

    await newConfig.save();
    res.status(201).json({ message: "Document inserted successfully" });
  } catch (error) {
    console.error("Error inserting document:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.put("/api/configurations/:id", async (req, res) => {
  const configId = req.params.id;
  const { remark } = req.body;

  try {
    const result = await Configuration.findOneAndUpdate(
      { configurationId: configId },
      { remark: remark },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    res.json({ message: "success" });
  } catch (error) {
    console.error("Error updating remark:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.get("/api/configurations/:id", async (req, res) => {
  const configId = req.params.id;

  try {
    const configuration = await Configuration.findOne({
      configurationId: configId,
    });

    if (!configuration) {
      return res.status(404).json({ message: "Configuration not found" });
    }

    res.json(configuration.configArray);
  } catch (error) {
    console.error("Error fetching configuration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend app running on port: ${PORT}`);
});
