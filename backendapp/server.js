const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const cors = require('cors');

const app = express();

// Connect Database
connectDB();

app.use(cors());

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/bills', require('./routes/api/bills'));
app.use('/api/customer', require('./routes/api/customer'));
app.use('/api/payments', require('./routes/api/payments'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 30000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
