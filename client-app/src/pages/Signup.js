import React, { useReducer, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { LOADING, SIGNUP_USER, GET_ERRORS } from "../types/index";
import { initialState, userReducer } from "../reducers/userReducer";
import UserContext from "../context/userContext";
import { Form, Button, Container, Row, Alert } from "react-bootstrap";

const Signup = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [cpassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState({});
  const [success, setSuccess] = React.useState({});
  const history = useHistory();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData.user) history.push("/");
    if (state.success) setSuccess(state.success);
    if (state.error) setError(state.error);
  }, [state, history, userData]);

  const SubmitForm = (event) => {
    event.preventDefault();
    if (password !== cpassword) {
      setError({
        cpassword: "Password doesn't match",
      });
    }
    dispatch({ type: LOADING });
    axios
      .post("/api/user/signup", { name, email, password })
      .then((res) => {
        dispatch({ type: SIGNUP_USER, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  return (
    <Container>
      <Row>
        <div
          className="loginForm"
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Form onSubmit={SubmitForm}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                type="text"
                placeholder="Enter Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              {error.name && (
                <Alert className="mt-2" variant="danger">
                  {error.name}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error.email && (
                <Alert className="mt-2" variant="danger">
                  {error.email}
                </Alert>
              )}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error.password && (
                <Alert className="mt-2" variant="danger">
                  {error.password}
                </Alert>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="cpassoword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error.cpassword && (
                <Alert className="mt-2" variant="danger">
                  {error.cpassword}
                </Alert>
              )}
            </Form.Group>

            <Button variant="primary" name="register" type="submit">
              Submit
            </Button>
            {success.message && (
              <Alert className="mt-2" variant="success">
                {success.message}
              </Alert>
            )}
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Signup;
