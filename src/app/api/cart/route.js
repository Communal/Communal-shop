// app/api/cart/route.js
import connectDB from "../../../config/db";
import Product from "../../../db/schema/Product";

export async function POST(req) {
  try {
    const { ids } = await req.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    await connectDB();

    const products = await Product.find({ _id: { $in: ids } });

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch cart items" }), { status: 500 });
  }
}
