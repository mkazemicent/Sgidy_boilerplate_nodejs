//server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); 
app.use(express.static(path.join(__dirname, '../public')));

connectDB(); // Connect to the database
app.use(cookieParser());  // Middleware to parse cookies

const jwt = require('jsonwebtoken');

// Middleware to check if the user is logged in
app.use((req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Adding decoded token to request object
    } else {
      req.user = null;
    }
  } catch (error) {
    req.user = null;
  }
  res.locals.user = req.user;  // Pass user info to the views
  next();
});
// Other middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const userRoutes = require('../routes/users');
app.use('/api', userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.render('index'); // This will render the index.ejs file
});
app.get('/login', (req, res) => {
  res.render('login'); // This will render the login.ejs file
});

// Serve registration page
function redirectIfAuthenticated(req, res, next) {
  if (req.user) {
    return res.redirect('/');  // Redirect to homepage if already logged in
  }
  next();
}

// Use this middleware in your login and register routes
app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login');
});

app.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register');
});
app.get('/logout', (req, res) => {
  res.clearCookie('token');  
  res.redirect('/');  
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
// Logging middleware
app.use(morgan('dev')); 
// Security Enhancements

app.use(helmet());
app.use(cors())
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});