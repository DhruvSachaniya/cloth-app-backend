const product = require('../models/Products');
const review = require('../models/Reviews');

exports.postreview = async (req, res) => {
    try {
        const { productid , rating, content } = req.body;

        const seller = req.user.userId;

        const newreview = await new review({
            productId: productid,
            userId: seller,
            rating,
            content,
            createdAt: date = new Date()
        })

        const updatereview = await newreview.save();
        res.status(200).json(updatereview);

    } catch (error) {
        res.status(500).json({ meassage: "internal server error", error });
    }
}