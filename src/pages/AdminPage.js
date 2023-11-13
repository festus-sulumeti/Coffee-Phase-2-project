import { useState } from "react";

export default function AdminPage({ usersDetails }) {
  //password and username
  const adminUsername = "kefry";
  const adminPassword = "kefry1234";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [LoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username === adminUsername && password === adminPassword) {
      setLoggedIn(true);
      return;
    } else if (username === "" || password === "") {
      alert("fill on the blank space ");
      return;
    }
    alert("invalid username or password");
    return;
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      {LoggedIn ? (
        <div>
          <h2>Admin Dashboard</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Message</th>
              </tr>
            </thead>
            <tbody>
              {usersDetails.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>
          <h2>Admin Login</h2>
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
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      )}
    </div>
  );
}
