const RequestedProduct = require('../model/requestedProductsModel');
const User = require("../model/userModel");
const nodemailer = require('nodemailer');

exports.getRequests = async (req, res) => {
    try {
        const Reqproducts = await RequestedProduct.find();
        return res.json(Reqproducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Server error');
    }
};

exports.updateRequest = async (req, res) => {
    const userId = req.session.userId;
    const { productLink, affiliateLink } = req.body;

    try {
        // Find the product request
        const product = await RequestedProduct.findOne({link : productLink});
        if (!product) {
            return res.status(404).send('Requested product not found');
        }

        // Send email with the affiliate link
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "genbus010@gmail.com",
                pass: "qoom fjxs qoso otcf",
            },
        });

        const currentUser = await User.findOne({userId : userId});
        const userEmail = currentUser.email;

        const mailOptions = {
            from: "genbus010@gmail.com",
            to: userEmail, // Assuming user_id stores the email
            subject: 'Your Affiliate Link is Ready!',
            html: `
                <h3>Hi there!</h3>
                <p>We've updated your requested product with an affiliate link. Check it out below:</p>
                <p><a href="${affiliateLink}">${affiliateLink}</a></p>
                <p>Thank you for using our platform!</p>
            `,
        };

        await transporter.sendMail(mailOptions);

        // Delete the requested product
        await RequestedProduct.findOneAndDelete({link : productLink});

        res.status(200).send('Affiliate link added, email sent, and request deleted successfully');
    } catch (error) {
        console.error('Error updating request:', error);
        res.status(500).send('Server error');
    }
};
