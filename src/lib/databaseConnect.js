
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.NEXT_PUBLIC_db_uri;

export const collectionList={
    usersCollection: "usersCollection",
    productsCollection: "productsCollection",
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function databaseConnect(collectionName){
try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return  await client.db(process.env.NEXT_PUBLIC_db_name).collection(collectionName);
  } catch {
    // Ensures that the client will close when you finish/error
    // await client.close();
    console.log("Something went wrong !!!");
  }

}




