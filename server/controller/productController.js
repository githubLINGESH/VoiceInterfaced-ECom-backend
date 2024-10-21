    //controller/productController
    const prod = require('../model/productModel');
    const RequestedProduct = require('../model/requestedProductsModel');
    //const trendingProducts = require('../model/trendingProductsModel');
    const LatestViewedProduct = require('../model/latestProductView');
    const fs = require('fs');
    const path = require('path');
    const mongoose = require('mongoose');

    exports.getProducts = async (req, res) => {
        try {
          const { category } = req.query;
          let query = {};
      
          if (category) {
            query = { category: { $regex: new RegExp(category, 'i') } }; // Case-insensitive match using regex
          }
      
          const products = await prod.find(query);
          return res.json(products);
        } catch (error) {
          console.error('Error fetching products:', error);
          res.status(500).send('Server error');
        }
      };

    exports.addProductsFromFile = async (req, res) => {
        try {
            const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
            const products = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
            // Find the max id in the existing products
            const maxProduct = await prod.findOne().sort({ id: -1 });
            let nextId = maxProduct ? maxProduct.id + 1 : 1;
    
            // Assign new IDs and add products to the database
            const newProducts = products.map(product => {
                product.id = nextId++;
                return product;
            });
    
            const result = await prod.insertMany(newProducts);
            res.status(201).json({ message: 'Products added successfully', products: result });
        } catch (error) {
            console.error('Error adding products:', error);
            res.status(500).json({ error: 'An error occurred while adding products' });
        }
    };

    exports.addProductsFromLink = async (req, res) => {
        try {
            const link = req.body.link;
            console.log("Comes here");
            console.log(req.session.userId);
    
            // Check if userId is valid
            // if (!mongoose.Types.ObjectId.isValid(req.session.userId)) {
            //     return res.status(400).json({ error: 'Invalid user ID' });
            // }
    
            // Save the request in the requested_products collection
            const requestedProduct = new RequestedProduct({
                user_id: req.session.userId, // Convert to ObjectId
                link,
            });
    
            await requestedProduct.save();
            res.status(201).json({ message: 'Product request submitted successfully' });
        } catch (error) {
            console.error('Error submitting product request:', error);
            res.status(500).json({ error: 'An error occurred while submitting the product request' });
        }
    };

    exports.searchProducts = async (req, res) => {
        try {
            const query = req.query.query;
            const products = await prod.find({
                $or: [
                    { name: { $regex: query, $options: 'i'} },
                    { category: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }
                ]
            }).limit(4);

            res.status(200).json({ products });
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ error: 'An error occurred while searching for products' });
        }
    };
    
    // Get trending products based on the last 14 days of views
exports.getTrendingProducts = async (req, res) => {
    try {
        // Calculate the date 14 days ago from today
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

        // Aggregate to count the number of views for each product in the last 14 days
        const trendingProducts = await LatestViewedProduct.aggregate([
            {
                $match: {
                    viewedAt: { $gte: fourteenDaysAgo }
                }
            },
            {
                $group: {
                    _id: "$productId", // Group by productId
                    count: { $sum: 1 } // Count the number of views
                }
            },
            {
                $sort: { count: -1 } // Sort by most views
            },
            {
                $limit: 4 // Optional: limit to top 10 trending products
            }
        ]);

        console.log(trendingProducts);

        // Populate the product details using the productId
        const populatedTrendingProducts = await Promise.all(trendingProducts.map(async (product) => {
            const productDetails = await prod.findOne({id : product._id}); // Assuming `prod` is your Product model
            return { product: productDetails, views: product.count };
        }));

        res.status(200).json(populatedTrendingProducts);
    } catch (error) {
        console.error('Error fetching trending products:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
