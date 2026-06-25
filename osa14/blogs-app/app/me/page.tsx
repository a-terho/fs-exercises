import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { newAPIToken } from '@/app/actions/users';
import BlogList from '@/app/components/BlogList';
import { getUserDataById } from '@/app/services/users';
import type { Blog } from '@/types';

const MePage = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  const data = await getUserDataById(Number(session.user?.id));
  const readingListBlogs =
    (data?.readingList.map((entry) => entry.blog) as Blog[]) || [];

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
          <h3 id="api-token">api token</h3>
          {data?.apiToken ? (
            <>
              <div>your personal access token:</div>
              <div>{data.apiToken}</div>
            </>
          ) : (
            <div>you have not generated personal access token yet</div>
          )}
          <form action={newAPIToken} className="mt-5">
            <input type="hidden" name="user-id" value={session.user?.id} />
            <input type="submit" value="generate new token" />
          </form>
        </div>
        <hr className="border-t border-foreground my-8 w-100" />
        <div>
          <h3 id="reading-list">reading list</h3>
          <BlogList
            blogs={readingListBlogs}
            emptyMessage="You have no blogs on the reading list."
          />
        </div>
      </div>
    </>
  );
};

export default MePage;
