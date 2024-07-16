import { MongoClient } from "mongodb";

async function testMongoConnection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
  }

  const redactedUri = redactMongoUri(uri);
  console.info("Connecting to MongoDB with URI:", redactedUri);

  try {
    const client = new MongoClient(uri, {
      ssl: true,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 10000,
    });

    await client.connect();
    console.info("MongoDB connection successful.");

    const db = client.db("gen4_mock");
    const collection = db.collection("actual_fee_charges");
    const result = await collection.findOne({ status: "APPROVED" });
    console.log("Query result:", result);

    await client.close();
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

function redactMongoUri(uri) {
  const url = new URL(uri);
  if (url.password) {
    url.password = "****";
  }
  return url.toString();
}

testMongoConnection().catch(console.error);
