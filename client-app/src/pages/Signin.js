import React, { useReducer, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import UserContext from "../context/userContext";
import { LOADING, GET_ERRORS } from "../types/index";
import { initialState, userReducer } from "../reducers/userReducer";
import { Form, Button, Container, Row, Alert } from "react-bootstrap";

const Signin = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState({});
  const history = useHistory();
  const { userData, setUserData } = useContext(UserContext);

  useEffect(() => {
    if (userData.user) history.push("/");
    if (state.error) setError(state.error);
  }, [state, history, userData]);

  const SubmitForm = (event) => {
    event.preventDefault();
    dispatch({ type: LOADING });
    axios
      .post("/api/user/signin", { email, password })
      .then((res) => {
        const userdata = jwt_decode(res.data.token);
        setUserData({ token: res.data.token, user: userdata });
        localStorage.setItem("auth-token", res.data.token);
        history.push("/");
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
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {error.email && (
              <Alert className="mt-2" variant="danger">
                {error.email}
              </Alert>
            )}
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {error.password && (
                <Alert className="mt-2" variant="danger">
                  {error.password}
                </Alert>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Signin;
