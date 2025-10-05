const express = require('express');
const cors = require('cors')
const app = express();
const connectDB = require('./db')
const users = require('./Routes/users')
const authRoutes = require('./Routes/auth')
const tokenRoutes = require('./Routes/token')
const delteImageRoute = require('./Routes/deleteImage');
const products = require('./Routes/products')
const review = require('./Routes/review')
const cartList = require('./Routes/Carts')
const order = require('./Routes/order')
const wishList = require('./Routes/WishList')

const PORT = 5000;

// body parser
app.use(express.json());

app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))

// connect to database
connectDB();

// token routes
app.use('/api', tokenRoutes)

// auth routes
app.use('/api', authRoutes)

// users route
app.use('/api',users)

// image delte
app.use('/api', delteImageRoute)

// products route
app.use('/api', products)

// review route
app.use('/api', review)

// cart route
app.use('/api', cartList)

// order route
app.use('/api', order)

// wishlist route
app.use('/api', wishList)

app.get('/', (req, res) => {
    console.log("I am inside home page router handler")
    res.send("Hello, welcome to happy shop")
});

app.listen(PORT, () => {
    console.log("Server is up")
});