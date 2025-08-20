import { connectDB } from "@/lib/db";
import Category from "@/models/Category";

let cache = {};
let cacheExpiry = {};

export default async function handler(req, res) {
  const { companyId } = req.query;

  if (cache[companyId] && Date.now() < cacheExpiry[companyId]) {
    return res.status(200).json(cache[companyId]);
  }

  await connectDB();
  const categories = await Category.find({ company: companyId }).lean();

  cache[companyId] = categories;
  cacheExpiry[companyId] = Date.now() + 5 * 60 * 1000; // 5 minutes

  res.status(200).json(categories);
}
