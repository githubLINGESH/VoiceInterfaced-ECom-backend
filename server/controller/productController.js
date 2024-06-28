    const prod = require('../model/productModel');


    exports.getProducts = async(req,res) => {
        try{
            const products = await prod.find()

            res.status(200).json(products)
        }
        catch(error){
            console.log("Error getting the products", error);
        }
    }

    exports.AddProducts = async(req,res) => {
        try{
            const newProduct = new prod(req.body);
            await newProduct.save();
            res.status(200).json("Added Successfully");
        }
        catch(error){
            res.status(500).json({"Error:":error});
        }
    }

