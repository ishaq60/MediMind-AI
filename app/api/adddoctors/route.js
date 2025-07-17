import connectDB from "@/app/lib/connectDb";

export const POST = async (req) => {
  console.log(req)
  try {
    const body = await req.json();
    const db = await connectDB();
    const doctorCollection = db.collection("Doctors");

    const result = await doctorCollection.insertOne(body);

    return new Response(
      JSON.stringify({ message: "Doctor created!", id: result.insertedId }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[POST_DOCTOR_ERROR]:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create doctor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};