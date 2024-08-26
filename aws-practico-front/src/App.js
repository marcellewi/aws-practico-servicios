import React, { useState } from "react";
import axios from "axios";

//const URL = "http://localhost:8000/";
const URL = "http://aws-servicio-env.us-east-1.elasticbeanstalk.com/";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const handleCreateUser = async () => {
    try {
      const response = await axios.post(URL + "api/users", {
        username,
        email,
        password
      });

      if (response.status === 201) {
        alert("Usuario creado exitosamente");
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        alert("Error al crear el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error al crear el usuario: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  const handleFetchUsers = async () => {
    try {
      console.log("URL: ", URL);
      console.log(URL + "/api/users");
      const response = await axios.get(URL + "api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error:", error);
      alert(
        `Error al obtener los usuarios: ${
          error.response?.data?.error || error.message
        }`
      );
    }
  };

  return (
    <div>
      <h1>Crear Usuario</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleCreateUser}>Crear Usuario</button>

      <h1>Lista de Usuarios</h1>
      <button onClick={handleFetchUsers}>Mostrar Usuarios</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
