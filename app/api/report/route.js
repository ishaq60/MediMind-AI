import connectDB from "@/app/lib/connectDb";

export const POST = async (request) => {
  try {
    const db = await connectDB();
    const reportCollection = db.collection("report");

    const reportData = await request.json();
    console.log("Incoming report data:", reportData);

    const result = await reportCollection.insertOne(reportData);

    const insertedDoc = await reportCollection.findOne({ _id: result.insertedId });
    console.log("Inserted document:", insertedDoc);

    return new Response(
      JSON.stringify({ message: "Report saved", insertedId: result.insertedId }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Report insertion error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to insert report data" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
