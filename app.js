const path = require('path')
const express = require('express');
const app = express();
const User = require('./models/user')
require('dotenv').config({ path: path.resolve(process.cwd(), 'config', '.env') })
// Mongoose config for the MongoDB database
require('./mongoose');

// Bring in the routes
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
// Create the port
const PORT = process.env.PORT;

// Middleware to parse JSON objects
app.use(express.json())

// Register middleware for the routes
app.use('/user', userRoutes)
app.use('/product', productRoutes)

async function main() {
    const query = await User.find();
    const selection = query.$where(function() { // query.$where is not a function
        return this.username === "Emmanuel Otobo"
    })
    console.log(selection)
}
// main()

app.listen(PORT, () => {
    console.log('Server running on port ', PORT)
})