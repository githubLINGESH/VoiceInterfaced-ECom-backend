// userCalltoActionController.js
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Create a transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'genbus010@gmail.com',
    pass : 'qoom fjxs qoso otcf'
  }
});

// Function to send the email
const sendEmail = async (email, product) => {
  const mailOptions = {
    from: 'genbus010@gmail.com',
    to: email, // User's email
    subject: `Don't miss out on ${product.name}!`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2 style="color: #333;">Thanks for viewing ${product.name}!</h2>
        <p style="color: #555;">We noticed you checked out this amazing product:</p>
        <div style="border: 1px solid #ddd; padding: 16px; margin: 16px 0;">
          <img src="${product.imageSrc}" alt="${product.name}" style="width: 100%; max-width: 300px;" />
          <h3 style="color: #333;">${product.name}</h3>
          <p style="color: #888;">Price: ₹${product.price}</p>
        </div>
        <p style="color: #555;">Click the button below to buy now before it's gone!</p>
        <a href="${product.link}" 
           style="display: inline-block; padding: 10px 20px; color: white; background-color: #f44336; 
           text-decoration: none; border-radius: 5px;">Shop Now</a>
        <p style="color: #555; margin-top: 20px;">Happy shopping!</p>
      </div>
    `
  };

  try {
    console.log("Mail Password", process.env.PASS_WORD);
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Schedule email to be sent after 20 seconds for testing
const scheduleEmail = (email, product) => {
    const task = cron.schedule('0 12 * * *', () => {
        sendEmail(email, product);
        task.stop(); // Stop the job after it has run
      });

  task.start(); // Start the scheduled task
};

module.exports = { scheduleEmail };
