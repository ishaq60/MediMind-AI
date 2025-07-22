// app/api/doctors/route.js
import connectDB from "@/app/lib/connectDb";

export const POST = async (req) => {
  try {
    const doctors = await req.json(); // Expecting an array of doctor objects

    const db = await connectDB();
    const doctorCollection = db.collection("Doctors");

    // Insert multiple records
    const result = await doctorCollection.insertMany(doctors);

    return new Response(
      JSON.stringify({
        message: `${result.insertedCount} doctor(s) inserted`,
        insertedIds: result.insertedIds
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("[POST_DOCTOR_ERROR]:", error);
    return new Response(
      JSON.stringify({ error: "Failed to insert doctors" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
