import React, { useState, useEffect, useReducer, useContext } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/userContext";
import {
  LOADING,
  GET_ERRORS,
  ADD_PROJECT,
  GET_PROJECTS,
  UPDATE_PROJECT,
} from "../types/index";
import { initialState, projectReducer } from "../reducers/projectReducer";
import Project from "../components/Project";
import AddProject from "../components/AddProject";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();
  const [state, dispatch] = useReducer(projectReducer, initialState);
  const [error, setError] = React.useState({});
  const { userData } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  useEffect(() => {
    if (state.error) setError(state.error);

    dispatch({ type: LOADING });
    axios
      .get("/api/project/get")
      .then((res) => {
        dispatch({ type: GET_PROJECTS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  }, [state.error, history]);

  const likeProject = (projectId, like) => {
    dispatch({ type: LOADING });
    axios
      .post(
        `/api/project/like`,
        { projectId, like },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      )
      .then((res) => {
        dispatch({ type: UPDATE_PROJECT, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  const unlikeProject = (projectId, unlike) => {
    dispatch({ type: LOADING });
    axios
      .post(
        `/api/project/unlike`,
        { projectId, unlike },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      )
      .then((res) => {
        dispatch({ type: UPDATE_PROJECT, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  const superlikeProject = (projectId, superlike) => {
    dispatch({ type: LOADING });
    axios
      .post(
        `/api/project/superlike`,
        { projectId, superlike },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      )
      .then((res) => {
        dispatch({ type: UPDATE_PROJECT, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  const favouriteProject = (projectId, favourite) => {
    dispatch({ type: LOADING });
    axios
      .post(
        `/api/project/favourite`,
        { projectId, favourite },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      )
      .then((res) => {
        dispatch({ type: UPDATE_PROJECT, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };
  const SubmitForm = (event) => {
    event.preventDefault();
    dispatch({ type: LOADING });
    axios
      .post(
        "/api/project/add",
        { name, description },
        {
          headers: {
            Authorization: userData.token,
          },
        }
      )
      .then((res) => {
        dispatch({ type: ADD_PROJECT, payload: res.data });
        setShow(false);
      })
      .catch((err) => {
        dispatch({ type: GET_ERRORS, payload: err.response.data });
      });
  };

  if (state.error === "Unauthorized") {
    return (
      <Redirect
        to={{
          pathname: "/signin",
        }}
      />
    );
  }
  if (state.loading)
    return (
      <Container>
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  return (
    <Container>
      <AddProject
        error={error}
        SubmitForm={SubmitForm}
        setName={setName}
        setDescription={setDescription}
        setShow={setShow}
        userData={userData}
        setFavourite={setFavourite}
        show={show}
      />
      <Row>
        {state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          state.projects.map((project) => (
            <Project
              userData={userData}
              key={project._id}
              likeProject={likeProject}
              unlikeProject={unlikeProject}
              superlikeProject={superlikeProject}
              favouriteProject={favouriteProject}
              project={project}
            />
          ))
        )}
      </Row>
    </Container>
  );
};

export default Home;
