import { useState, useImperativeHandle } from 'react';

const Toggleable = ({ buttonLabel, ref, children }) => {
  const [visible, setVisible] = useState(false);
  const displayWhenVisible = { display: visible ? undefined : 'none' };
  const displayWhenNotVisible = { display: visible ? 'none' : undefined };

  const toggleVisibility = () => setVisible(!visible);

  // paljasta näkyvyyttä säätelevä metodi muiden komponenttien käytttöön
  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      <button style={displayWhenNotVisible} onClick={toggleVisibility}>
        {buttonLabel}
      </button>
      <div style={displayWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  );
};

export default Toggleable;
