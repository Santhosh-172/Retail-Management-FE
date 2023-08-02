import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Navbar } from "react-bootstrap";
import "./Header.css";
// import { useUpdateAuth } from "../../Context/AuthContext";

const Header = () => {
  // const handleUser = useUpdateAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    // localStorage.removeItem("user");
    // handleUser();
    navigate("/login");
  };

  return (
    <>
      <div className="row">
        <div className="col-9">
          <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container className="container">
              <Navbar.Brand href="/">SuperMarket</Navbar.Brand>
              {/* <Navbar.Toggle aria-controls="navbar-nav" /> */}
              {/* <Navbar.Collapse id="navbar-nav"> */}
              <nav className="navbar">
                <ul className="nav nav-tabs">
                  {/* <li className="nav-item">
                      <NavLink className="nav-link" to="/login">
                        SignIn
                      </NavLink>
                    </li> */}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/product">
                      Product
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/stock">
                      Stock
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/customer">
                      Customer
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/billing">
                      Billing
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/billinghistory">
                      Billing History
                    </NavLink>
                  </li>
                </ul>
              </nav>
              {/* </Navbar.Collapse> */}
              <div className="logout-button">
                <Button className="btn" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Container>
          </Navbar>
        </div>
      </div>
    </>
  );
};

export default Header;
