import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { markBlogRead } from '@/app/actions/blogs';
import { newAPIToken } from '@/app/actions/users';
import { getUserDataById } from '@/app/services/users';
import type { Blog } from '@/types';

import BlogList from '@/app/components/BlogList';

const MePage = async () => {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  const data = await getUserDataById(Number(session.user?.id));

  // parse readingList into two different arrays based on read status
  const unreadBlogs =
    data?.readingList.reduce((list: Blog[], entry) => {
      if (!entry.read) list.push(entry.blog);
      return list;
    }, []) || [];
  const readBlogs =
    data?.readingList.reduce((list: Blog[], entry) => {
      if (entry.read) list.push(entry.blog);
      return list;
    }, []) || [];

  const buttonAction = {
    text: 'mark as read',
    callback: markBlogRead,
  };

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
          {unreadBlogs.length > 0 ? (
            <>
              <h4>unread ({unreadBlogs.length})</h4>
              <BlogList blogs={unreadBlogs} buttonAction={buttonAction} />
            </>
          ) : null}
          {readBlogs.length > 0 ? (
            <>
              <h4>read ({readBlogs.length})</h4>
              <BlogList blogs={readBlogs} />
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MePage;
