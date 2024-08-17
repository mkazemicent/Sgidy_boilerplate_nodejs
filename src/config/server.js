require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views')); 
app.use(express.static(path.join(__dirname, '../public')));

connectDB(); // Connect to the database
app.use(cookieParser());  // Middleware to parse cookies

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

// Define routes
const userRoutes = require('../routes/users');
app.use('/api', userRoutes);

// Middleware to set active page in views
function setActivePage(req, res, next) {
  const routePath = req.path;
  let activePage = '';

  if (routePath === '/') activePage = 'home';
  else if (routePath === '/login') activePage = 'login';
  else if (routePath === '/register') activePage = 'register';
  else if (routePath === '/about') activePage = 'about';
  else if (routePath === '/contact') activePage = 'contact';

  res.locals.active = activePage;
  next();
}

app.use(setActivePage);

// Basic route
app.get('/', (req, res) => {
  res.render('index', { active: 'home' });
});

// Serve login and registration pages
function redirectIfAuthenticated(req, res, next) {
  if (req.user) {
    return res.redirect('/');  // Redirect to homepage if already logged in
  }
  next();
}

app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', { active: 'login' });
});

app.get('/register', redirectIfAuthenticated, (req, res) => {
  res.render('register', { active: 'register' });
});

app.get('/about', (req, res) => {
  res.render('about', { active: 'about' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { active: 'contact' });
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
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
