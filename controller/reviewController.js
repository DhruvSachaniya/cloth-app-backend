const product = require('../models/Products');
const review = require('../models/Reviews');

exports.postreview = async (req, res) => {
    try {
        const { productid , rating, content } = req.body;

        if(!productid) {
            res.status(401),json({ meassage: "product is anvailable!"});
        }

        const seller = req.user.userId;
        //add review to product schems here
        const newreview = await new review({
            productId: productid,
            userId: seller,
            rating,
            content,
            createdAt: date = new Date()
        })

        const updatereview = await newreview.save();

        if(updatereview) {
            const updateproduct = await product.findOneAndUpdate(
                { _id: productid},
                { $push: {reviews: {user: seller, rating, content}} },
                { new: true }
            );

            if(!updateproduct) {
                res.status(500).json({meassage: "failed to add reviews to product!"});
            }

            res.status(200).json({meassage: "sucessfully added review", product: updateproduct});
        }
        console.log(updatereview);

    } catch (error) {
        res.status(500).json({ meassage: "internal server error", error });
    }
}

exports.reviewinfo = async (req, res) => {
    try {
        const seller = req.user.userId;

        const foundreview = await review.find();

        if(foundreview) {
            res.status(200).json(foundreview)
        } else {
            res.status(500).json({meassage: "there is no review!"});
        }
    } catch(error) {
        res.status(500).json(error);
    }
}