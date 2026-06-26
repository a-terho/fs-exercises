import { type NextRequest, NextResponse } from 'next/server';
import { addUser } from '@/app/services/users';

interface Body {
  username: string;
  name: string;
  password: string;
}

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    );
  }

  const body: Body = await req.json();
  await addUser(body.username, body.name, body.password);
  return NextResponse.json(null, { status: 201 });
};
