const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');


/* DB CONNECTION */
const connectDB = require('./config/db');

/* CONFIG */
dotenv.config();

/* CONNECT DATABASE */
connectDB();

/* APP */
const app = express();

/* MIDDLEWARE */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

/* TEST ROUTE */
app.get('/', (req, res) => {

  res.status(200).json({
    success: true,
    message: 'RoboParts Backend Running Successfully'
  });

});

/* SAMPLE PRODUCTS API */
app.get('/api/products', (req, res) => {

  const products = [

    {
      id: 1,
      name: 'DC Motor',
      price: 350
    },

    {
      id: 2,
      name: 'Arduino UNO',
      price: 550
    },

    {
      id: 3,
      name: 'Ultrasonic Sensor',
      price: 120
    }

  ];

  res.status(200).json(products);

});

/* AUTH ROUTES */
app.use('/api/auth', authRoutes);

/* ORDER ROUTES */
app.use('/api/orders', orderRoutes);

/* PORT */
const PORT = process.env.PORT || 5000;

/* SERVER */
app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
