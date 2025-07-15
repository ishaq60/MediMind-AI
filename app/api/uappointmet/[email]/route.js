import connectDB from "@/app/lib/connectDb";

export async function GET(req, context) {
  const { email } = context.params;
  console.log(email)

  try {
    const db = await connectDB();
    const BuserCollection = db.collection("appointmentBooking");
    
    // Adjusted query to match the nested structure
    const userDoc = await BuserCollection.findOne({ "user.data.user.email": email });

    if (!userDoc) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(userDoc), {
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
