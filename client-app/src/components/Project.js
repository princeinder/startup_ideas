import React from "react";
import { Card } from "react-bootstrap";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiOutlineHeart,
  AiOutlineStar,
  AiFillLike,
  AiFillDislike,
  AiFillStar,
  AiFillHeart,
} from "react-icons/ai";

const Project = ({
  likeProject,
  unlikeProject,
  superlikeProject,
  favouriteProject,
  project,
  userData,
}) => {
  return (
    <Card className="project-card">
      <Card.Body>
        <Card.Title>{project.name}</Card.Title>
        <Card.Text>{project.description}</Card.Text>
        <div className="text-muted footer-icons">
          <div className="reactions">
            {userData.user &&
            project.likes.find((like) => like === userData.user._id) ? (
              <span
                className="icon"
                onClick={() => likeProject(project._id, "remove")}
              >
                <AiFillLike size="1.4em" color="#17a2b8" />
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => likeProject(project._id, "add")}
              >
                <AiOutlineLike size="1.4em" />
              </span>
            )}

            <span className="count">{project.likes.length}</span>
          </div>
          <div className="reactions">
            {userData.user &&
            project.unlikes.find((unlike) => unlike === userData.user._id) ? (
              <span
                className="icon"
                onClick={() => unlikeProject(project._id, "remove")}
              >
                <AiFillDislike size="1.4em" color="#17a2b8" />
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => unlikeProject(project._id, "add")}
              >
                <AiOutlineDislike size="1.4em" />
              </span>
            )}

            <span className="count">{project.unlikes.length}</span>
          </div>
          <div className="reactions">
            {userData.user &&
            project.superlikes.find(
              (superlike) => superlike === userData.user._id
            ) ? (
              <span
                className="icon"
                onClick={() => superlikeProject(project._id, "remove")}
              >
                <AiFillHeart size="1.4em" color="#17a2b8" />
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => superlikeProject(project._id, "add")}
              >
                <AiOutlineHeart size="1.4em" />
              </span>
            )}

            <span className="count">{project.superlikes.length}</span>
          </div>
          <div className="reactions">
            {userData.user &&
            project.favourites.find(
              (favourite) => favourite === userData.user._id
            ) ? (
              <span
                className="icon"
                onClick={() => favouriteProject(project._id, "remove")}
              >
                <AiFillStar size="1.4em" color="#17a2b8" />
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => favouriteProject(project._id, "add")}
              >
                <AiOutlineStar size="1.4em" />
              </span>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Project;
