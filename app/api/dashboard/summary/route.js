import connectDB from "@/app/lib/connectDb";

export const GET = async () => {
  try {
    const db = await connectDB();

    const usersCollection = db.collection("user");
    const doctorsCollection = db.collection("Doctors");
    const appointmentsCollection = db.collection("appointmentBooking");

    // ✅ Total users
    const totalUsers = await usersCollection.countDocuments();

    // ✅ Total doctors
    const totalDoctors = await doctorsCollection.countDocuments();

    // ✅ Total appointments
    const totalAppointments = await appointmentsCollection.countDocuments();

    // ✅ Aggregate avgRating & totalReviews from Doctors collection
    const doctorAgg = await doctorsCollection.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: "$rating" },
          totalReviews: { $sum: "$reviews" },
        },
      },
    ]).toArray();

    const avgRating = doctorAgg[0]?.avgRating || 0;
    const totalReviews = doctorAgg[0]?.totalReviews || 0;

    return new Response(
      JSON.stringify({
        totalUsers,
        totalDoctors,
        totalAppointments,
        avgRating: avgRating.toFixed(1),
        totalReviews,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch summary." }),
      { status: 500 }
    );
  }
};
