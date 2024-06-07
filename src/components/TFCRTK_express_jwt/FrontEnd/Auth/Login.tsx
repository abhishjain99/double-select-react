import { useState } from "react"
import { LoginForm } from "./LoginForm";

const baseURL = "http://localhost:3000"

export const Login = (props: any) => {
  const { onLogin } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(baseURL+"/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if(response.ok) {
      localStorage.setItem("token", data.token);
      onLogin();
    } else {
      alert(data.message);
    }
  }

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      type="Login"
    />
  )
}