const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const uri = "mongodb+srv://richardohata:O0yRhyrf1e4bBNej@cluster0.2mm0yjp.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get("/test", async (req, res) => {
  try {
    await client.connect();

    const database = client.db("Testing");
    const userCollection = database.collection("Users");
    const users = await userCollection.find().toArray();
    res.json(users);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    // Close the MongoDB connection when done
    await client.close();
  }
})

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
