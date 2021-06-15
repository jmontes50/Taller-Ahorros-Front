import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function useAuth() {
  let history = useHistory();
  const { setAuthUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const registerUser = async (data) => {
    const { nombre, apellido, correo, password } = data;
    console.log({data})
    let headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post(`http://localhost:5000/register`, {
        nombre,
        apellido,
        correo,
        password,
      }, { headers })
      .then(async (res) => {
        console.log({res})
        setAuthUser(res.data.access_token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err)
        setError(err.data);
      });
  };

  const loginUser = async (data) => {
    console.log({data})
    const { email, password } = data;
    let headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post(`http://localhost:5000/login`, {
        email,
        password,
      }, { headers })
      .then(async (res) => {
        setAuthUser(res.data.access_token);
        history.push("/dashboard");
      })
      .catch((err) => {
        setError(err.data);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
