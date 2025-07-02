import connectDB from "@/app/lib/connectDb";


export async function GET() {
  const client = await connectDB();
  const db = client; // or client.db('your-db-name')

  const reports = await db.collection('reports').find().sort({ createdAt: -1 }).toArray();

  return new Response(JSON.stringify(reports), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection('reports').insertOne({
    ...body,
    createdAt: new Date(),
  });

  return new Response(JSON.stringify(result), { status: 201 });
}
