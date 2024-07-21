const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const prodRoutes = require('./routes/productRoutes');
const LLmRoutes = require('./routes/llmRoutes');
const UserContextRoutes = require('./routes/userContextRoutes');
const chatHistoryRoutes = require('./routes/chatHistoryRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3001;

const app = express();

const authMiddleware = require('./middleware/authMiddleware');

const dbURL = 'mongodb+srv://dealOn1800:' + encodeURIComponent('IDg7CCKEUitybSE6') + '@cluster0.a08ehca.mongodb.net/Ecom?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server only after successful database connection
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// // Serve static files from the React app
// app.use(express.static(path.join(__dirname,'../public')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'../public', 'index.html'));
// });

// Set up Express sessions
app.use(session({
    secret: 'AHnh#!*#%(!^bglyiasfM43275M',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: dbURL,
        ttl: 14 * 24 * 60 * 60 // 14 days
    }),
    cookie: {
        maxAge: 1000 * 60 * 60, // 1 hour
        secure: process.env.NODE_ENV === 'production', // true if using HTTPS
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Adjust based on your requirement
    }
}));


app.use(express.static(__dirname));

app.get('/auth-check', (req, res) => {
    console.log('In Auth:', req.session.userId);
    res.json({ userId: req.session.userId });
});

app.use((req, res, next) => {
    console.log('Session Middleware:', req.session);
    next();
});

// Use user and cart routes
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/prod', prodRoutes);
app.use('/llm', LLmRoutes);
app.use('/UContext',UserContextRoutes);
app.use('/messageHistory', chatHistoryRoutes);


