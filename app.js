// Import the 'express' module and the 'check' and 'validationResult' functions from the 'express-validator' module
const express = require("express"),
  { check, validationResult } = require("express-validator");

// Create an instance of the Express application
const app = express();

// Set the view engine to use EJS templates
app.set("view engine", "ejs");

// Use the built-in middleware for handling JSON request data
app.use(express.json());

// Use the built-in middleware for handling URL-encoded request data
app.use(express.urlencoded({ extended: true }));

// Handle GET requests on the home page
app.get("/", (req, res) => {
  // Render the 'index' template
  res.render("index");
});

// Handle GET requests on the registration page
app.get("/register", (req, res) => {
  // Render the 'register' template
  res.render("register");
});

// Handle POST requests on the registration form
app.post(
  "/register",
  [
    // Validate that the 'username' field exists and is at least three characters long
    check("username", "This username must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    // Validate that the 'email' field is a valid email address
    check("email", "Email is not valid").isEmail().normalizeEmail(),
  ],
  (req, res) => {
    // Check for validation errors and render the 'register' template with error messages if there are any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register", { alert: errors.array() });
    }
    // If there are no validation errors, send a success message
    res.send("Registration Successful!");
  }
);

// Start the server and listen for incoming requests on the specified port
const port = 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


/*
Reference - https://www.youtube.com/watch?v=z8m_Vy_9FIs
*/