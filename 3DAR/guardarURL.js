const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const uri = "mongodb+srv://haifengyu:145365258@3d.nkhtzja.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const data = [
    { markerUrl: "./logo3.patt", modelUrl: "./tren.glb" },
    { markerUrl: "./XD.patt", modelUrl: "./model2.glb" }
];

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect(); 

        const database = client.db("cursos3d"); 
        const collection = database.collection("cursos3d"); 

        await collection.insertMany(data);

        console.log("Data inserted successfully.");

    } finally {
        await client.close(); 
    }
}

run().catch(console.error);