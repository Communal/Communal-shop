import { NextResponse } from 'next/server';
import User from '../../../db/schema/User';

export async function POST(request) {
  const { id, email } = await request.json();
  if (!id && !email) {
    return NextResponse.json({ error: 'id or email required' }, { status: 400 });
  }
  let query = {};
  if (id) query._id = id.toString();
  if (email) query.email = email;
  const user = await User.findOne(query).lean();
  return NextResponse.json({ user });
}