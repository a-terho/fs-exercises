import { useField } from '../hooks';

const BirthYearForm = ({ authors, onSend }) => {
  const born = useField('text');

  const submit = (event) => {
    event.preventDefault();
    // luetaan valintalaatikon arvot (bloatbloat)
    const formData = new FormData(event.target);
    const fields = Object.fromEntries(formData.entries());

    onSend({ name: fields.name, born: born.props.value });
    born.reset();
  };

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <span>name</span>
        <select name="name">
          {authors.map((author) => (
            <option key={author.id} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          <label>
            born <input {...born.props}></input>
          </label>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthYearForm;
