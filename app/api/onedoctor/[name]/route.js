import connectDB from "@/app/lib/connectDb";

export async function GET(req, context) {
  const { name } = await context.params;

  try {
    const db = await connectDB();
    const DoctorsCollection = db.collection("Doctors");
    const user = await DoctorsCollection.findOne({ name });

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
    console.error("Error fetching user by email:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
