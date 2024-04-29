const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const { GridFSBucket } = require('mongodb');

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
    const database = client.db("3d");
    const bucket = new GridFSBucket(database);

    // Read the glTF file
    const modelReadStream = fs.createReadStream('./tren.glb');

    // Upload the model file to GridFS
    const uploadStream = bucket.openUploadStream('tren.glb');
    await new Promise((resolve, reject) => {
      modelReadStream.pipe(uploadStream)
        .on('error', reject)
        .on('finish', resolve);
    });
    console.log('Model saved to database');

    // Download the model file from GridFS
    // const downloadStream = bucket.openDownloadStreamByName('tren.glb');
    // const fileWriteStream = fs.createWriteStream('./tren_retrieved.glb');
    // await new Promise((resolve, reject) => {
    //   downloadStream.pipe(fileWriteStream)
    //     .on('error', reject)
    //     .on('finish', resolve);
    // });
    // console.log('Model retrieved from database');
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
