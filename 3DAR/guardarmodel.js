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
    const collection = base.collection('models');
    console.log("Connected to MongoDB!");

    // Read the glTF file
    // const modelData = fs.readFileSync('./tren.gltf');

    // Insert the model data into the database
    // await collection.insertOne({ model: modelData });
    // console.log('Model saved to database');

    // Find the model document from the database
    const doc = await collection.findOne({});

    // Convert the Binary instance to Buffer
    const modelBuffer = Buffer.from(doc.model.buffer);

    // Write the Buffer to a file
    fs.writeFile('tren_retrieved.gltf', modelBuffer, err => {
      if (err) throw err;
      console.log('Model retrieved from database');
    });
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
