import connectDB from "@/app/lib/connectDb";

export const POST = async (request) => {
  try {
    const db = await connectDB();
    const Bookingcollection = db.collection("appointmentBooking");

    const bookingData = await request.json(); // Parse incoming data

    const res = await Bookingcollection.insertOne(bookingData);
    return Response.json(res);
  } catch (error) {
    console.error("Booking insertion error:", error);
    return Response.json({ error: "Failed to insert booking data" }, { status: 500 });
  }
};
