import connectDB from "@/app/lib/connectDb";
import { ObjectId } from "mongodb";


export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    console.log(id)

    if (!id) {
      return new Response(JSON.stringify({ error: "No ID provided" }), {
        status: 400,
      });
    }

    const db = await connectDB();
    const doctorCollections = db.collection("Doctors");

    const result = await doctorCollections.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return new Response(JSON.stringify({ message: "User deleted" }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete user" }), {
      status: 500,
    });
  }
}
