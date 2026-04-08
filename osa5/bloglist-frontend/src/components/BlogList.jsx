import Blog from './Blog';

const BlogList = ({ user, blogs }) => (
  <>
    <h2>saved blogs</h2>
    {blogs.map((blog) => {
      // näytä vain blogit, joiden luoja on nykyinen käyttäjä
      // tunnistus tapahtuu tällä hetkellä käyttäjänimen perusteella
      if (blog.user?.username === user.username) {
        return <Blog key={blog.id} blog={blog} />;
      }
    })}
  </>
);

export default BlogList;
