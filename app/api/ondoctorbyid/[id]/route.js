import connectDB from "@/app/lib/connectDb";
import { ObjectId } from "mongodb";


export async function GET(req, context) {
  const { id } = context.params;

  try {
    const db = await connectDB();
    const DoctorsCollection = db.collection("Doctors");

    // Convert id to ObjectId
    const user = await DoctorsCollection.findOne({ _id: new ObjectId(id) });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
