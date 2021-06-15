import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export default function useAuth() {
  let history = useHistory();
  const { setAuthUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  // const URL = process.env.REACT_APP_URL_API
  const URL = "https://taller-ahorros.herokuapp.com"

  const registerUser = async (data) => {
    const { nombre, apellido, correo, password } = data;
    let headers = {
      "Content-Type": "application/json",
    };
    
    console.log({URL})

    return axios
      .post(`${URL}/register`, {
        nombre,
        apellido,
        correo,
        password,
      }, { headers })
      .then(async (res) => {
        setAuthUser(res.data.access_token);
        history.push("/");
      })
      .catch((err) => {
        console.log({err})
        setError(err.data);
      });
  };

  const loginUser = async (data) => {
    console.log({URL})
    const { email, password } = data;
    let headers = {
      "Content-Type": "application/json",
    };
    return axios
      .post(`${URL}/login`, {
        email,
        password,
      }, { headers })
      .then(async (res) => {
        setAuthUser(res.data.access_token);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log({err})
        setError(err.data);
      });
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
