    //controller/productController
    const prod = require('../model/productModel');
    const fs = require('fs');
    const path = require('path');

    exports.getProducts = async(req,res) => {
        try{
            const products = await prod.find()

            res.status(200).json(products)
        }
        catch(error){
            console.log("Error getting the products", error);
        }
    }

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
    