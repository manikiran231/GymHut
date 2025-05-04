const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// ✅ Proper CORS setup for Render frontend
app.use(cors({
  origin: 'https://gymhut.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Example API route
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  console.log(`Password reset requested for email: ${email}`);
  res.status(200).json({ message: 'Password reset link sent' });
});

// ✅ Catch-all handler for React frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
