const UserContext = require('../model/userContextModel');
const LatestViewedProduct = require('../model/latestProductView');

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
      const viewedProduct = new LatestViewedProduct({
        userId,
        productId,
        productName,
        productPrice,
        productImageSrc
      });

  
      await viewedProduct.save();
      return res.status(201).json({ message: 'Product viewed and saved successfully!' });
    } catch (error) {
      return res.status(500).json({ message: 'Error saving viewed product', error });
    }
  };
  
  // Get latest viewed products by user ID
  exports.getLatestViewedProducts = async (req, res) => {
    try {
      const userId = req.session.userId;
  
      const viewedProducts = await LatestViewedProduct.find({ userId }).sort({ viewedAt: -1 }).limit(10);
      return res.status(200).json(viewedProducts);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving viewed products', error });
    }
  };

  