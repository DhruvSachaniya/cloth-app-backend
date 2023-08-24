//modules
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
//require
const path = require('path');
const config = require('./config/config');
//routes
const authRoutes = require('./router/authRoutes');
const ProductRoutes = require('./router/ProductRoutes');
const CartRoutes = require('./router/CartRoutes');
const OrderRoutes = require('./router/OrderRoutes');
const WishlistRoutes = require('./router/WishlistRouter');
const accountRoutes = require('./router/accountRoutes');
const reviewRoutes = require('./router/reviewRoutes');
const indexRoute = require('./router/indexRoute');
//use
app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({extended: true}))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//database conections
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
//app routes
app.use('/', indexRoute,
            ProductRoutes,
            CartRoutes,
            OrderRoutes,
            WishlistRoutes,
            accountRoutes,
            reviewRoutes
);
app.use('/auth', authRoutes);


//app listen
app.listen(config.port, (req, res) => {
    console.log(`post is running on ${config.port}`);
})