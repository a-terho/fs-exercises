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
        <div data-testid="user-profile">
          <h2>my profile</h2>
          <div data-testid="user-name">
            name: <strong>{session.user?.name}</strong>
          </div>
          <div data-testid="user-username">
            username: <strong>{session.user?.email}</strong>
          </div>
        </div>
        <hr className="border-t border-foreground my-8 w-100" />
        <div data-testid="api-token-section">
          <h3 id="api-token">api token</h3>
          {data?.apiToken ? (
            <div data-testid="token-display">
              <div>your personal access token:</div>
              <code data-testid="api-token">{data.apiToken}</code>
            </div>
          ) : (
            <div data-testid="no-token-message">
              you have not generated personal access token yet
            </div>
          )}
          <form action={newAPIToken} className="mt-5">
            <input
              data-testid="generate-token-button"
              type="submit"
              value="generate new token"
            />
          </form>
        </div>
        <hr className="border-t border-foreground my-8 w-100" />
        <div data-testid="reading-list-section">
          {unreadBlogs.length === 0 && readBlogs.length == 0 ? (
            <p data-testid="empty-reading-list">Your reading list is empty.</p>
          ) : (
            <h3 id="reading-list">reading list</h3>
          )}
          {unreadBlogs.length > 0 ? (
            <div data-testid="unread-section">
              <h4>unread ({unreadBlogs.length})</h4>
              <BlogList
                blogs={unreadBlogs}
                buttonAction={buttonAction}
                buttonTestIdPrefix="mark-read-"
              />
            </div>
          ) : (
            <p data-testid="no-unread-blogs">No unread blogs.</p>
          )}
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
