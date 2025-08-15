import { NextResponse } from "next/server";
import dbConnect from "@/config/db";
import Transaction from "@/db/schema/Transaction";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const status = searchParams.get("status");
  const description = searchParams.get("description");

  const filter = {};

  if (type) filter.type = type;
  if (status) filter.status = status;
  if (description) filter.description = description;

  try {
    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .lean();
    const clean = transactions.map((t) => ({
      ...t,
      amount: parseFloat(t.amount.toString()), // Convert Decimal128 to number
      _id: t._id.toString(), // Convert ObjectId to string if needed
    }));
    return NextResponse.json(clean);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}