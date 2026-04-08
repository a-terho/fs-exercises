const NewBlogForm = ({
  onTitleChange,
  onAuthorChange,
  onUrlChange,
  onSubmit,
}) => (
  <>
    <h2>add new blog</h2>
    <form onSubmit={onSubmit}>
      <div>
        <label>
          title <input type="text" onChange={onTitleChange}></input>
        </label>
      </div>
      <div>
        <label>
          author <input type="text" onChange={onAuthorChange}></input>
        </label>
      </div>
      <div>
        <label>
          url <input type="text" onChange={onUrlChange}></input>
        </label>
      </div>
      <button type="submit">add</button>
    </form>
  </>
);

export default NewBlogForm;
