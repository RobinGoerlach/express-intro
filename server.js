console.log("Server is starting");

// Import the Express library using ES6 syntax
//const express = require("express");
import express from "express";

console.log("Server is reading configuration");
// Import and configure dotenv to load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();
console.log(
  "Server is reading configuration found connnection string: " +
    process.env.PG_URL
);

// Define the server port, defaulting to 3000 if not set in the environment
const port = process.env.PORT || 3000;

// Log message to confirm the server is starting
console.log("Server is running");

/* "inMemory Datadase": A wishlist array with default items
const wishlist = [
  { id: 0, title: "Christmast on August", owner: "Santa" },
  { id: 1, title: "Marble Track", owner: "Isaiah" },
  { id: 2, title: "Horse", owner: "Miriam" },
];*/
import Wishlist from "./modles/Whishlist.js";

// Create an instance of an Express application
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

/*
  HOME Endpoint Controller
  Handles requests to the root URL '/'
  Returns a simple greeting message
*/
app.get("/", (req, res) => {
  console.log("Home route");
  res.send("ALIVE!");
});

/* Create of CRUD
  Add a new Wish to Wishlist Endpoint Controller
  Handles POST requests to '/wishlist'
  Adds a new wish to the wishlist array
  Expects JSON data in the request body
*/
app.post("/wishlist", async (req, res) => {
  //console.log("POST /wishlist");
  //console.log(req.body);

  // Add the new wish to the wishlist and assign a unique ID
  //const newWish = { ...req.body, id: wishlist.length + 1 };
  //wishlist.push(newWish);
  // res.json(newWish); // Send a success response with the added wish
  const { title, owner } = req.body;

  // validation isString(title) title.length() < 40 ...
  if (!title || !owner)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const item = await Wishlist.create({ title, owner });
    console.log(item);

    // Send a success response with the added wish
    if (!item)
      return res.status(500).json({ msg: "Creating new wish failed!" });
    res.json({ data: item, msg: "Wish succesful added to Wishlist" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Whishlist item can&aps;t be created" });
  }
});

/* Read of CRUD
  Wishlist Endpoint Controller
  Handles GET requests to '/wishlist'
  Returns all the entires in wishlist as JSON
*/
app.get("/wishlist", async (req, res) => {
  console.log("GET /wishlist");
  //res.json(wishlist);

  try {
    const items = await Wishlist.findAll();
    if (!items.length)
      return res.status(404).json({ msg: "Wishlist is empty" });

    res.json({ data: items, msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
});

/*
  Dynamic Route Wishlist Endpoint Controller
  Handles GET requests to '/wishlist/:id'
  Fetches a specific wishlist item by its ID
  Returns a 404 error if the item is not found
*/
app.get("/wishlist/:id", async (req, res) => {
  console.log("GET /wishlist/:id");
  const { id } = req.params; // Extract the 'id' parameter from the request

  // Find the item in the wishlist array by matching the ID
  // const item = wishlist.find((wish) => wish.id === Number(id));
  // res.json(item); // Return the found item as JSON
  try {
    const item = await Wishlist.findByPk(id);

    // If no item is found, send a 404 status with an error message
    if (!item) {
      return res.status(404).send("Item not found");
    }

    // Return the found item as JSON
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update (replace complet item) wish
app.put("/wishlist/:id", async (req, res) => {
  console.log("PUT /wishlist/:id");
  const { id } = req.params; // Extract the 'id' parameter from the request
  const { title, owner } = req.body;
  if (!title || !owner)
    return res.status(400).json({ msg: "All fields are required" });

  try {
    const rowCount = await Wishlist.update({ title, owner }, { where: { id } });
    if (!rowCount[0]) return res.status(500).json({ msg: "Update failed" });

    res.json({ msg: "Update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Wishlist item cannot be created." });
  }
});

// Delete

/*
  Dynamic Route Wishlist Endpoint Controller
  Handles GET requests to '/wishlist/:id'
  Fetches a specific wishlist item by its ID
  Returns a 404 error if the item is not found
*/
app.delete("/wishlist/:id", async (req, res) => {
  console.log("DELETE /wishlist/:id");
  const { id } = req.params; // Extract the 'id' parameter from the request

  // Find the item in the wishlist by matching the ID
  // const item = wishlist.find((wish) => wish.id === Number(id));
  // res.json(item); // Return the found item as JSON
  try {
    const rowCount = await Wishlist.destroy({ where: { id } });

    // If no item is found, send a 404 status with an error message
    if (!rowCount) {
      return res.status(404).send("Item not found to be deleted");
    }

    // Return the found item as JSON
    res.json({ msg: "Successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});
