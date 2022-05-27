import { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  async function authenticate(e) {
    e.preventDefault();
    if (username === "" || password === "") {
      alert("Username/Password cannot be empty. Please enter a value.");
      return;
    }

    let credentials = { username: username, password: password };

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(credentials),
    });
    const res = await response.json();
    if (res.response === "success") {
      props.setLoginState(true);
    } else {
      alert("Invalid credentials. Failed to login.");
    }
  }

  if (props.loginState) {
    return null;
  }
  return (
    <div className="App-form">
      <form onSubmit={(e) => authenticate(e)}>
        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input
            type="text"
            className="form-control w-25"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            className="form-control w-25"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;
