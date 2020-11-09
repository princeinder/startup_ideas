import React from "react";
import { useHistory } from "react-router-dom";

import { Form, Button, Alert, Modal } from "react-bootstrap";

const AddProject = ({
  setName,
  setDescription,
  setShow,
  SubmitForm,
  show,
  userData,
  setFavourite,
  error,
}) => {
  const history = useHistory();
  return (
    <>
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        {userData.user && (
          <>
            <Button
              variant="primary"
              className="text-right"
              onClick={() => setShow(true)}
            >
              Add Project
            </Button>
          </>
        )}
      </div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Form onSubmit={SubmitForm}>
          <Modal.Header closeButton>
            <Modal.Title>Add Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            {error.name && (
              <Alert className="mt-2" variant="danger">
                {error.name}
              </Alert>
            )}
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                required
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
              />
              {error.desc && (
                <Alert className="mt-2" variant="danger">
                  {error.desc}
                </Alert>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddProject;
