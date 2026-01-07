const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes'); // Importing your routes

// 1. Initialize App and Environment Variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// 2. Middlewares (The "Translators")
app.use(cors({
  origin: 'https://bookish-broccoli-qwqvrpggg5ghx7jx-5173.app.github.dev', // Your exact frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
})); // Allows your React app to talk to this backend
app.use(express.json()); // Converts incoming JSON strings into JS Objects (req.body)

// 3. Database Connection Logic
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1); // Stop the server if DB fails
  });

// 4. Routes (Directing Traffic)
// Every request starting with /api/tasks will be sent to your taskRoutes file
app.use('/api/tasks', taskRoutes);

// 5. Basic "Health Check" Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// 6. Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Server is humming on http://localhost:${PORT}`);
});