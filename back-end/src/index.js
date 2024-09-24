const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/auth');
const coursesRoute = require('./routes/courses');
const userRoutes = require('./routes/userRoutes');
const checkRole = require('./routes/checkRole');

// Import models
const User = require('./models/User'); // Adjust the path as needed

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Example custom middleware
const requestLogger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Call the next middleware
};

app.use(requestLogger); // Use the custom middleware

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../front_end/build')));

// Connect to MongoDB
mongoose.set('strictQuery', true);
const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('MONGO_URI environment variable is not defined');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/auth', authRoutes);
app.use('/courses', coursesRoute);
app.use('/users', userRoutes);
app.use('/role', checkRole);

// Catch-all route to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../front_end/build', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
