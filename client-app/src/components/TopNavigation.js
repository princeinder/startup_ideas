import React, { useContext } from "react";
import { Navbar, Nav, Button, Form } from "react-bootstrap";
import UserContext from "../context/userContext";
import { Link } from "react-router-dom";

const TopNavigation = () => {
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Project Ideas</Navbar.Brand>
        <Nav className="mr-auto"></Nav>

        <Form inline>
          {userData.user ? (
            <>
              <Navbar.Collapse className="justify-content-end mr-2">
                <Navbar.Text>
                  Signed in as: <a href="/">{userData.user.name}</a>
                </Navbar.Text>
              </Navbar.Collapse>
              <Button variant="info" className="mr-2" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="info" className="mr-2">
                  Signin
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="info">Signup</Button>
              </Link>
            </>
          )}
        </Form>
      </Navbar>
      <br />
    </>
  );
};

export default TopNavigation;
