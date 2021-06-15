import React,{useContext} from "react";
import { Navbar, Container } from "react-bootstrap";
import Logo from "../assets/Logo.png"
import { UserContext } from "../context/UserContext";
function Navtop() {

  const {setAuthUser} = useContext(UserContext)

  const logout = () => {
    setAuthUser(null)
  }
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand className="font-weight-bold"><img src={Logo} alt="logo" style={{width:'30px', marginRight:8}}/>CodiAhorro</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <button className="btn btn-light btn-sm"><i className="fas fa-door-open mr-1" onClick={logout}></i>Salir</button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navtop;
