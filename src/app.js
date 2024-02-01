const express = require('express');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());

app.use('/api', productRoutes);

// Default 
app.get('/', (req, res) => {
  res.send('Welcome to HomePage!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the app object for testing
module.exports = app;
