const express = require('express');
const app = express();
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
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);

    const io = socketIo(server, {
        cors: {
        origin: "https://dealon.onrender.com",
        methods: ["GET", "POST"]
        }
    });

const port = process.env.PORT || 3001;

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');
    
        socket.on('disconnect', () => {
        console.log('Client disconnected');
        });
    });
    
global.io = io;

const authMiddleware = require('./middleware/authMiddleware');

const dbURL = 'mongodb+srv://dealOn1800:' + encodeURIComponent('IDg7CCKEUitybSE6') + '@cluster0.a08ehca.mongodb.net/Ecom?retryWrites=true&w=majority';
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server only after successful database connection
        server.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB', error);
    });

// Enable CORS for all routes
app.use(cors({
    origin: 'https://dealon.onrender.com',
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
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

app.use(express.static(__dirname));

app.get('/auth-check', (req, res) => {
    console.log('In Auth:', req.session.userId);
    res.json({ userId: req.session.userId });
});

app.use((req, res, next) => {
    //console.log('Session Middleware:', req.session);
    next();
});

// Use user and cart routes
app.use('/user', userRoutes);
app.use('/cart', cartRoutes);
app.use('/prod', prodRoutes);
app.use('/llm', LLmRoutes);
app.use('/UContext',UserContextRoutes);
app.use('/messageHistory', chatHistoryRoutes);


