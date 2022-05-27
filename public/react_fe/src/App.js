import "./App.css";
import { useState } from "react";
import Login from "./Login";
import Notes from "./Notes";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <header className="App-header">
        <h1> AIRBUS Starter Project </h1>
      </header>
      <Login
        loginState={isLoggedIn}
        setLoginState={(state) => setIsLoggedIn(state)}
      />
      <Notes
        loginState={isLoggedIn}
        setLoginState={(state) => setIsLoggedIn(state)}
      />
    </div>
  );
}

export default App;
