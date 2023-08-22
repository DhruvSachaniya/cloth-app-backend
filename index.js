const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyparser = require('body-parser');
const morgan = require('morgan');
const config = require('./config/config');

const authRoutes = require('./router/authRoutes');
const ProductRoutes = require('./router/ProductRoutes');
const CartRoutes = require('./router/CartRoutes');
const OrderRoutes = require('./router/OrderRoutes');
const WishlistRoutes = require('./router/WishlistRouter');
const indexRoute = require('./router/indexRoute');

app.use(express.json());
app.use(morgan("tiny"));
app.use(bodyparser.urlencoded({extended: true}))

mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

app.use('/', indexRoute,
            ProductRoutes,
            CartRoutes,
            OrderRoutes,
            WishlistRoutes
);
app.use('/auth', authRoutes);



app.listen(config.port, (req, res) => {
    console.log(`post is running on ${config.port}`);
})