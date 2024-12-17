//const express = require("express");
import express from "express";

console.log("Server is running");

const wishlist = [
  { id: 1, title: "Marble Track", owner: "Isaiah" },
  {
    id: 2,
    title: "Horse",
    owner: "Miriam",
  },
];

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json()); // Middleware how to handle req.body

app.listen(port, () => {
  console.log("Server is listening on port: " + port);
});

/* HOME Endpoint Controller */
app.get("/", (req, res) => {
  console.log("Hit home route");
  // console.log(req);
  // console.dir(req, { depth: 3 });
  res.send("Hello!");
});

/* Wishlist Endpoint Controller */
app.get("/wishlist", (req, res) => {
  console.log("GET /wishlist");
  // console.log(req);
  res.json(wishlist);
});

/* Dynamic Route Wishlist Endpoint Controller */
app.get("/wishlist/:id", (req, res) => {
  console.log("POST /wishlist/");
  console.log(req.params);
  const { id } = req.params;
  const item = wishlist.find((wish) => wish.id == +id);
  if (!item) res.status(404).send("Item not found");
  res.json(item);
});

/* Add a Wish to Wishlist Endpoint Controler */
app.post("/wishlist", (req, res) => {
  console.log("POST /wishlist");
  console.log(req.body);
  wishlist.push({ ...req.body, id: wishlist.length + 1 });
  res.send("Added entry: " + req.body);
});
