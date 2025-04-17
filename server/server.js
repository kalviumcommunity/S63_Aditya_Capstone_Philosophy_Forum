const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// In-memory storage for journals (simulating DB)
let journals = [
  { id: "68008e7ca0a7affc01ce9854", content: "First journal entry", visibility: "private" },
  { id: "2", content: "Second journal entry", visibility: "public" },
];

// Basic test endpoint
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello, this is Philosophy Forum!" });
});

// PUT route to update journal entry
app.put("/api/journals/update/:id", (req, res) => {
  const { id } = req.params;
  const { content, visibility } = req.body;

  // Find the journal entry by id
  const journalIndex = journals.findIndex((journal) => journal.id === id);

  if (journalIndex === -1) {
    return res.status(404).json({ message: "Journal entry not found" });
  }

  // Update the journal entry
  journals[journalIndex] = { ...journals[journalIndex], content, visibility };

  // Send back the updated journal
  res.status(200).json(journals[journalIndex]);
});

// Journal routes (you can add more journal-related routes here in the future)
const journalRoutes = require("./routes/journalRoutes");
app.use("/api/journals", journalRoutes);

// Default API test
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🟢 Server running on http://localhost:${PORT}`);
});
