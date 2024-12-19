import express from "express";
import dotenv from "dotenv";
import Wishlist from "./models/Whishlist.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

// Root endpoint - simple health check
app.get("/", (req, res) => {
  res.send("ALIVE!");
});

// Create a new wish
app.post("/wishlist", async (req, res) => {
  const { title, owner } = req.body;

  if (!title || !owner) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const item = await Wishlist.create({ title, owner });
    if (!item) {
      return res.status(500).json({ msg: "Failed to add wish" });
    }
    res.json({ data: item, msg: "Wish successfully added to Wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error adding wish to Wishlist" });
  }
});

// Get all wishes
app.get("/wishlist", async (req, res) => {
  try {
    const items = await Wishlist.findAll();
    if (!items.length) {
      return res.status(404).json({ msg: "Wishlist is empty" });
    }
    res.json({ data: items, msg: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error retrieving Wishlist" });
  }
});

// Get a specific wish by ID
app.get("/wishlist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Wishlist.findByPk(id);
    if (!item) {
      return res.status(404).json({ msg: "Wish not found" });
    }
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error retrieving wish" });
  }
});

// Update a wish by ID
app.put("/wishlist/:id", async (req, res) => {
  const { id } = req.params;
  const { title, owner } = req.body;

  if (!title || !owner) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const [updatedRows] = await Wishlist.update(
      { title, owner },
      { where: { id } }
    );
    if (!updatedRows) {
      return res.status(500).json({ msg: "Failed to update wish" });
    }
    res.json({ msg: "Wish successfully updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error updating wish" });
  }
});

// Delete a wish by ID
app.delete("/wishlist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRows = await Wishlist.destroy({ where: { id } });
    if (!deletedRows) {
      return res.status(404).json({ msg: "Wish not found for deletion" });
    }
    res.json({ msg: "Wish successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting wish" });
  }
});
