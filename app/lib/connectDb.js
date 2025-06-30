import { MongoClient, ServerApiVersion } from "mongodb";

let db;

const connectDB = async () => {
  if (db) return db;

  try {
    const uri ="mongodb+srv://MedIAI:nVfTVApOTFV2b2DW@cluster0.vu8ej.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect(); // Important to connect before using the DB

    db = client.db("MedIAI"); // Your actual database name

    console.log("MongoDB connected to database MediAI");

    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectDB;
