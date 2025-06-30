import connectDB from "@/app/lib/connectDb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const db = await connectDB();
    const userCollection = db.collection("user");

    // 👇 Parse incoming request
    const newUser = await request.json();

    // ✅ Log the received data
    console.log("Received user data:", newUser);

    // ⚠️ Optional: Validate required fields
    if (!newUser.name || !newUser.email || !newUser.password) {
      return NextResponse.json(
        { error: "Missing required user fields" },
        { status: 400 }
      );
    }

    // ✅ Insert into MongoDB
    const result = await userCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "New user added", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error); // 👈 Log error
    return NextResponse.json(
      { error: "Failed to add user" },
      { status: 500 }
    );
  }
};
