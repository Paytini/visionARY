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
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const base = client.db("3d");
    const collection = base.collection('images');
    await console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // const imageData = fs.readFileSync('./logo3.patt');
    
    // // 将图片数据插入到数据库中
    // await collection.insertOne({ image: imageData });
    
    // console.log('Image saved to database');
    // 查询数据库中的第一个文档
    const doc = await collection.findOne({});
    
    // 将Binary实例转换为Buffer
    const imageData = Buffer.from(doc.image.buffer);
    
    // 将Buffer写入文件
    fs.writeFile('retrieved.patt', imageData, err => {
      if (err) throw err;
      console.log('Image retrieved from database');
    });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);