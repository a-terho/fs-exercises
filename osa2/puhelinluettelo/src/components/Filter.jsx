const Filter = ({ text, onChange }) => {
  return (
    <>
      filter names with <input value={text} onChange={onChange} />
    </>
  );
};

export default Filter;
