import connectDB from "@/app/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const db = await connectDB();
    const doctorCollection = db.collection("Doctors");
    const res = await doctorCollection.findOne({ _id: new ObjectId(params.id) });
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
};
