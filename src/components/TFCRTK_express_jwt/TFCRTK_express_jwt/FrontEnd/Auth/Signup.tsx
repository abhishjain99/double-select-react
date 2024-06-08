import { useState } from "react"
import { LoginForm } from "./LoginForm";

const baseURL = "http://localhost:3000"

export const Signup = (props: any) => {
  const { onSignup } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(username === "" || username === undefined || password === "" || password === undefined) {
      alert("Can't leave the fields blank");
      return;
    }
    const response = await fetch(baseURL+"/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    console.log(response);
    const data = await response.json();
    if(response.ok) {
      localStorage.setItem("token", data.token);
      onSignup();
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
      type="Signup"
    />
  )
}