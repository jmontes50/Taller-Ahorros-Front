import { useState } from "react";
import { Link } from "react-router-dom";
import LoginImg from "../assets/Login.png";
import Logo from "../assets/Logo.png";
import useAuth from "../hooks/useAuth";

function LoginView() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleValue = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const { loginUser, error } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    let response = await loginUser(value);
    console.log({response})
  };

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
                <div className="brand-wrapper d-flex">
                  <img src={Logo} alt="logo" className="logo" />
                  <h3 className="font-weight-bold ml-2">CodiAhorro</h3   >
                </div>
                <p className="login-card-description">Ingresa en tu cuenta</p>
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
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
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="submit"
                    value="Login"
                  />
                </form>
                {/* <a href="#!" className="forgot-password-link">Forgot password?</a> */}
                <p className="login-card-footer-text">
                  No tienes una cuenta?
                  <Link
                    to="/register"
                    className="text-reset ml-1 font-weight-bold"
                  >
                    Registrate aquí
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

export default LoginView;
