const UserContext = require('../model/userContextModel');
const LatestViewedProduct = require('../model/latestProductView');
const prod = require('../model/productModel');
const { scheduleEmail } = require('../controller/userCallToActionController');
const { getUserInformation } = require('../controller/userController');
const moment = require('moment');

exports.AddUserContext = async (req, res) => {
    try {
        const newUserContext = new UserContext(req.body);
        await newUserContext.save();
        res.status(201).json(newUserContext);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update an existing user context
exports.updateUserContext = async (req, res) => {
    try {
        const updatedUserContext = await UserContext.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUserContext) {
            return res.status(404).json({ message: 'User context not found' });
        }
        res.status(200).json(updatedUserContext);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Post a viewed product
exports.postViewedProduct = async (req, res) => {
    try {
        const { productId, productName, productPrice, productImageSrc } = req.body;
        const userId = req.session.userId;

        console.log(productId, productName, productPrice, productImageSrc);

        // Check if the product was already viewed by this user
        const existingProductView = await LatestViewedProduct.findOne({ userId, productId });

        if (existingProductView) {
            // Calculate the difference in days between now and the last viewed time
            const lastViewedDate = moment(existingProductView.updatedAt); // Assuming you have a 'updatedAt' field
            const currentDate = moment();

            const daysSinceLastView = currentDate.diff(lastViewedDate, 'days');

            // Only save and send email if the product was last viewed more than 2 days ago
            if (daysSinceLastView < 2) {
                return res.status(200).json({ message: 'Product already viewed recently, no email sent.' });
            }
        }

        // Save the product view as it is either new or viewed after 2 days
        const viewedProduct = existingProductView || new LatestViewedProduct({
            userId,
            productId,
            productName,
            productPrice,
            productImageSrc
        });

        viewedProduct.updatedAt = new Date(); // Update the last viewed time
        await viewedProduct.save();

        // Retrieve user's email using userId
        const user = await getUserInformation(userId);
        const email = user.email;

        // Create a product object to pass to the email scheduler
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            imageSrc: productImageSrc,
            link: `http://dealon.onrender.com/product/${productId}`
        };

        // Schedule the email to be sent after 20 seconds for testing
        scheduleEmail(email, product);

        return res.status(201).json({ message: 'Product viewed and saved successfully!' });
    } catch (error) {
        console.error('Error saving viewed product:', error);
        return res.status(500).json({ message: 'Error saving viewed product', error });
    }
};
  
  // Get latest viewed products by user ID
  exports.getLatestViewedProducts = async (req, res) => {
    try {
      const userId = req.session.userId;
  
      const viewedProducts = await LatestViewedProduct.find({ userId }).sort({ viewedAt: -1 }).limit(5);
      console.log("Latest Products", viewedProducts);

      // Populate the product details using the productId
      const populatedLatestProducts = await Promise.all(viewedProducts.map(async (product) => {
        const productDetails = await prod.findOne({id : product.productId}); // Assuming `prod` is your Product model
        return { product: productDetails };
    }));

      return res.status(200).json(populatedLatestProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving viewed products', error });
    }
  };

