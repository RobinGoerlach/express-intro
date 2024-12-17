// Import the Express library using ES6 syntax
import express from "express";

// Import and configure dotenv to load environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

// Log message to confirm the server is starting
console.log("Server is running");

// Sample data: A wishlist array with default items
const wishlist = [
  { id: 1, title: "Marble Track", owner: "Isaiah" },
  { id: 2, title: "Horse", owner: "Miriam" },
];

// Define the server port, defaulting to 3000 if not set in the environment
const port = process.env.PORT || 3000;

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
  console.log("Hit home route");
  res.send("Hello!");
});

/*
  Wishlist Endpoint Controller
  Handles GET requests to '/wishlist'
  Returns the entire wishlist array as JSON
*/
app.get("/wishlist", (req, res) => {
  console.log("GET /wishlist");
  res.json(wishlist);
});

/*
  Dynamic Route Wishlist Endpoint Controller
  Handles GET requests to '/wishlist/:id'
  Fetches a specific wishlist item by its ID
  Returns a 404 error if the item is not found
*/
app.get("/wishlist/:id", (req, res) => {
  console.log("GET /wishlist/:id");
  const { id } = req.params; // Extract the 'id' parameter from the request

  // Find the item in the wishlist by matching the ID
  const item = wishlist.find((wish) => wish.id === Number(id));

  // If no item is found, send a 404 status with an error message
  if (!item) {
    return res.status(404).send("Item not found");
  }

  // Return the found item as JSON
  res.json(item);
});

/*
  Add a Wish to Wishlist Endpoint Controller
  Handles POST requests to '/wishlist'
  Adds a new wish to the wishlist array
  Expects JSON data in the request body
*/
app.post("/wishlist", (req, res) => {
  console.log("POST /wishlist");
  console.log(req.body);

  // Add the new wish to the wishlist array and assign a unique ID
  const newWish = { ...req.body, id: wishlist.length + 1 };
  wishlist.push(newWish);

  // Send a success response with the added wish
  res.json(newWish);
});
