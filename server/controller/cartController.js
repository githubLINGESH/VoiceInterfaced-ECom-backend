const Cart = require("../model/cartmodel");

// Add to Cart Controller
exports.addToCart = async (req, res) => {
    try {
        let { products } = req.body;
        const userId = req.session.userId; // Retrieve userId from session

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: No user session found.' });
        }

        // Find the user's cart or create a new one
        let cart = await Cart.findOne({ userId });

        if(!Array.isArray(products)){
            products = [products];
        }

        if (!cart) {
            cart = new Cart({ userId, products });
        } else {
            
            // Update the existing cart with new products
            products.forEach((product) => {
                const existingProduct = cart.products.find(p => p.id === product.id);
                if (existingProduct) {
                    // Update existing product details
                    existingProduct.name = product.name;
                    existingProduct.imageSrc = product.imageSrc;
                    existingProduct.store = product.store;
                    existingProduct.price = product.price;
                    existingProduct.d_price = product.d_price;
                    existingProduct.discount = product.discount;
                    existingProduct.description = product.description;
                    existingProduct.link = product.link;
                } else {
                    cart.products.push(product);
                }
            });
        }

        await cart.save();

        res.status(200).json({ message: 'Products added to cart successfully.' });
    } catch (error) {
        console.error("Error while adding to cart:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

// Get Cart Controller
exports.getCart = async (req, res) => {
    try {
        const userId = req.session.userId; // Retrieve userId from session

        console.log("UserId while retrieving cart:", userId);

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized: No user session found.' });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error("Error while retrieving cart:", error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

exports.deleteProductFromCart = async (req, res) => {
    const { productId } = req.params; // Get productId from request params
    const userId = req.session.userId; // Retrieve userId from session

    try {
        // Find the user's cart and remove the product by its id
        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Find the product in the cart and remove it
        const productIndex = cart.products.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        // Remove the product
        cart.products.splice(productIndex, 1);
        
        // Save the updated cart
        await cart.save();
        return res.status(200).json({ message: 'Product deleted successfully', cart });
    } catch (error) {
        console.error('Error deleting product from cart:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



