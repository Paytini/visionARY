const User = require('../modulos/user.js');
const { MongoClient, ServerApiVersion, GridFSBucket } = require('mongodb');
let listUser = [];
const uri = "mongodb+srv://dianaperez84:9iJLUefvRcSEjgDC@visionary.7coaqcl.mongodb.net/";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

const mostrar = async (req,res) =>{
    try {
        connectToDatabase();
        const base = client.db("test");
        const collection = base.collection('users');
        const cursor = collection.find({});
        const data = await cursor.toArray();
        if (!data) {
            return res.status(404).send('No data found');
        }
        console.log("existe");
        res.send(data);
        client.close();
    } catch (error) {
        console.error("Error fetching pattern data:", error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    mostrar
};