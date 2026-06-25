import { type NextRequest, NextResponse } from 'next/server';
import { getUserByAPIToken } from '@/app/services/users';

const parseToken = (header: string | null) => {
  if (!(header && header.startsWith('Bearer '))) return null;
  return header.substring(7).trim();
};

export const GET = async (req: NextRequest) => {
  const apiToken = parseToken(req.headers.get('authorization'));
  if (!apiToken) {
    return NextResponse.json(
      { error: 'unauthorized, token missing' },
      { status: 401 },
    );
  }

  const user = await getUserByAPIToken(apiToken);
  if (!user) {
    return NextResponse.json(
      { error: 'unauthorized, invalid token' },
      { status: 401 },
    );
  }

  return NextResponse.json({ user });
};
