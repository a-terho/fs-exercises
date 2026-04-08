const LoginForm = ({ onUsernameChange, onPasswordChange, onSubmit }) => (
  <>
    <h2>login to application</h2>
    <form onSubmit={onSubmit}>
      <div>
        <label>
          username <input type="text" onChange={onUsernameChange}></input>
        </label>
      </div>
      <div>
        <label>
          password <input type="password" onChange={onPasswordChange}></input>
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </>
);

export default LoginForm;
