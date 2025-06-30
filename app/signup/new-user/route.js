import connectDB from "@/app/lib/connectDb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("user");

    const newUser = await request.json();
    console.log("Received user data:", newUser);

    if (!newUser.name || !newUser.email || !newUser.password) {
      return NextResponse.json(
        { error: "Missing required user fields" },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await userCollection.findOne({ email: newUser.email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists with this email" },
        { status: 409 } // 409 Conflict
      );
    }

    // ✅ Insert new user
    const result = await userCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "New user added", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);
    return NextResponse.json(
      { error: "Failed to add user" },
      { status: 500 }
    );
  }
};
