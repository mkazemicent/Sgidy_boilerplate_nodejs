# Sgidy Boilerplate Node.js

A Node.js boilerplate using Express, EJS, and MongoDB, designed to kickstart any web application project with user authentication and best practices for security and performance.

## Features

- MVC architecture for organized code structure
- User authentication using JSON Web Tokens (JWT)
- Secure password hashing with bcrypt
- Environmental variable management with dotenv
- Logging with Morgan
- Security enhancements with Helmet and CORS
- Error handling middleware
- Static file serving with Express
- Bootstrap for responsive design
- Mongodb for database

## Project Structure

Sgidy_boilerplate_nodejs/
│
├── src/
│ ├── config/
│ │ ├── db.js # Database connection configuration
│ │ └── server.js # Server configuration and startup
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── views/
│ │ ├── partials/ # Partial views
│ │ └── index.ejs
│ └── public/ # Static files
│ ├── css/ # CSS files
│ ├── js/ # JavaScript files
│ └── img/ # Images
├── node_modules/
│
├── .env # Environment variables
├── .gitattributes
├── .gitignore
├── package.json
└── package-lock.json

## Environment Setup

To run this project, you will need to add the following environment variables to your .env file:

- `PORT` - Port number for the server to listen on
- `DB_URI` - MongoDB connection URI
- `JWT_SECRET` - Secret key for signing JWTs

## Installation

Clone the project and install dependencies:

```bash
git clone https://github.com/mkazemicent/Sgidy_boilerplate_nodejs.git
cd sgidy_boilerplate_nodejs
npm install
Usage
Start the server:

bash
Copy code
npm start
Contributing
Contributions are always welcome! Please adhere to this project's code of conduct.

License
Distributed under the ISC License. See LICENSE for more information.

Created by Sgidy the not so much maginificent!
```
