import connectDB from "@/app/lib/connectDb";

export const GET = async (req) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("user");
    const doctors = await userCollection.find().toArray();

    return new Response(
      JSON.stringify({ res: doctors }), // wrap in an object for consistency
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("[GET_DOCTORS_ERROR]:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch doctors" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
