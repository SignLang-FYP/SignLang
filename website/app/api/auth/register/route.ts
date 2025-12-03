import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();

  if (!email || !password || !name) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  }

  if (db.users.findByEmail(email)) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashed = db.hashPassword(password);
  const user = db.users.create({ email, password: hashed, name });

  return NextResponse.json({ message: 'Registered successfully', user: { email: user.email, name: user.name } });
}