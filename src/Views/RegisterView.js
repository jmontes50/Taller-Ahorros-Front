import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";
import LoginImg from "../assets/Login.png";
import Logo from "../assets/logo.svg";

function RegisterView() {
  const [value, setValue] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
  });

  const handleValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const { registerUser, error } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    let response = await registerUser(value);
 }

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters">
            <div className="col-md-5">
              <img src={LoginImg} alt="login" className="login-card-img" />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <div className="brand-wrapper">
                  <img src={Logo} alt="logo" className="logo" />
                </div>
                <p className="login-card-description">Crea una cuenta</p>
                <form onSubmit={handleRegister}>
                  <div className="form-group">
                    <label htmlFor="name" className="sr-only">
                      Nombres
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      id="name"
                      className="form-control"
                      placeholder="Nombres Completos"
                      value={value.nombre}
                      onChange={handleValue}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname" className="sr-only">
                      Apellidos
                    </label>
                    <input
                      type="text"
                      name="apellido"
                      id="lastname"
                      className="form-control"
                      placeholder="Apellidos Completos"
                      value={value.apellido}
                      onChange={handleValue}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="correo"
                      id="email"
                      className="form-control"
                      placeholder="Correo Electrónico"
                      value={value.correo}
                      onChange={handleValue}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="***********"
                      value={value.password}
                      onChange={handleValue}
                    />
                  </div>
                  <input
                    name="register"
                    id="register"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                  />
                </form>
                {/* <a href="#!" className="forgot-password-link">Forgot password?</a> */}
                <p className="login-card-footer-text">
                  Ya tienes una cuenta?
                  <Link to="/" className="text-reset ml-1 font-weight-bold">
                    Ingresa aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default RegisterView;
