import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users, blogs, readingList } from '@/db/schema';

export const DELETE = async () => {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is not available in production' },
      { status: 403 },
    );
  }

  await db.delete(users);
  await db.delete(blogs);
  await db.delete(readingList);
  return NextResponse.json({}, { status: 204 });
};
