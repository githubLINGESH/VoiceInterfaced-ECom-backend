const RequestedProduct = require('../model/requestedProductsModel')

exports.getRequests = async (req, res) => {
    try {
  
      const Reqproducts = await RequestedProduct.find();
      return res.json(Reqproducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Server error');
    }
  };