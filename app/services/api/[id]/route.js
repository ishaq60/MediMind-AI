
import connectDB from "@/app/lib/connectDb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const db = await connectDB();
    const doctorCollection = db.collection("Doctors");
    const doctor = await doctorCollection.findOne({ _id: new ObjectId(params.id) });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch doctor" }, { status: 500 });
  }
}
