import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { newAPIToken } from '@/app/actions/users';
import { getUserAPIToken } from '@/app/services/users';

const MePage = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  const apiToken = await getUserAPIToken(Number(session.user?.id));

  return (
    <>
      <div className="flex flex-col items-center text-center">
        <div>
          <h2>my profile</h2>
          <div>
            name: <strong>{session.user?.name}</strong>
          </div>
          <div>
            username: <strong>{session.user?.email}</strong>
          </div>
        </div>
        <hr className="border-t border-foreground my-8 w-100" />
        <div>
          <h3>api token</h3>
          {apiToken ? (
            <>
              <div>your personal access token:</div>
              <div>{apiToken}</div>
            </>
          ) : (
            <div>you have nott generated personal access token yet</div>
          )}
          <form action={newAPIToken} className="mt-5">
            <input type="hidden" name="user-id" value={session.user?.id} />
            <input type="submit" value="generate new token" />
          </form>
        </div>
      </div>
    </>
  );
};

export default MePage;
