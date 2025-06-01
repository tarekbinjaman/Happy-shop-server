const express = require('express');
const app = express();
const connectDB = require('./db')
const users = require('./Routes/users')
const authRoutes = require('./Routes/auth')
const tokenRoutes = require('./Routes/token')

const PORT = 5000;

// body parser
app.use(express.json());

// connect to database
connectDB();

// token routes
app.use('/api', tokenRoutes)

// auth routes
app.use('/api', authRoutes)

// users route
app.use('/api',users)

app.get('/', (req, res) => {
    console.log("I am inside home page router handler")
    res.send("Hello, welcome to happy shop")
});

app.listen(PORT, () => {
    console.log("Server is up")
});