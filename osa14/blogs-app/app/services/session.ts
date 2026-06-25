import { auth } from '@/auth';
import { getUserById } from './users';

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session?.user.id) return undefined;
  return getUserById(Number(session?.user.id));
};
