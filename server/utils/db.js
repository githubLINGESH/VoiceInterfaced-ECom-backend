// db.js
const { MongoClient } = require('mongodb');

const mongoClient = new MongoClient('mongodb+srv://dealOn1800:IDg7CCKEUitybSE6@cluster0.a08ehca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const dbName = 'Ecom';

async function connectToDatabase() {
    await mongoClient.connect();
    const db = mongoClient.db(dbName);
    return { db, mongoClient };
}

module.exports = connectToDatabase;
