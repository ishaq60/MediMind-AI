import connectDB from "@/app/lib/connectDb";


export const GET = async () => {
  try {
    const db = await connectDB();
    const doctorCollection = db.collection("Doctors");
    const res = await doctorCollection.find().toArray();
    return Response.json(res);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
};
