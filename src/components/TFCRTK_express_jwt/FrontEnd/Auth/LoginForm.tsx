import './loginform.css';

export const LoginForm = (props: any) => {
  const { handleSubmit, username, setUsername, password, setPassword, type } = props;
  const buttonClassname = type + "Button"
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className={buttonClassname} type="submit">{type}</button>
    </form>
  );
}