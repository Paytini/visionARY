const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');

const uri = "mongodb+srv://haifengyu:145365258@3d.nkhtzja.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const base = client.db("3d");
    const collection = base.collection('scenes');
    console.log("Connected to MongoDB!");

    // Read the scene file
    // const sceneData = fs.readFileSync('./scene.bin');

    // Insert the scene data into the database
    // await collection.insertOne({ scene: sceneData });
    // console.log('Model saved to database');

    // Find the scene document from the database
    const doc = await collection.findOne({});

    // Convert the Binary instance to Buffer
    const sceneBuffer = Buffer.from(doc.scene.buffer);

    // Write the Buffer to a file
    fs.writeFile('scene_retrieved.bin', sceneBuffer, err => {
      if (err) throw err;
      console.log('Scene retrieved from database');
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
