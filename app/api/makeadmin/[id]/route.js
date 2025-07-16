import connectDB from "@/app/lib/connectDb";
import { ObjectId } from "mongodb";


export const PATCH = async (req, context) => {
  const { id } = context.params; // ✅ Correct
  const { role } = await req.json();
console.log(id,role)
  try {
    const db = await connectDB();
    const users = db.collection("user");

    const result = await users.updateOne(
      { _id: new ObjectId(id) },
      { $set: { type: role } }
    );

    if (result.modifiedCount > 0) {
      return Response.json({ success: true });
    } else {
      return Response.json({ success: false }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to update role" }, { status: 500 });
  }
};
