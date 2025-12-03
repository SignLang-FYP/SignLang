import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = db.users.findByEmail(email);
  if (!user || !db.comparePassword(password, user.password)) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const response = NextResponse.json({ message: 'Logged in', user: { email: user.email, name: user.name } });
  cookies().set('session', btoa(JSON.stringify({ email: user.email, name: user.name })), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return response;
}

export async function GET(req: NextRequest) {
  const session = cookies().get('session')?.value;
  if (!session) return NextResponse.json({ user: null });

  try {
    const user = JSON.parse(atob(session));
    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ user: null });
  }
}