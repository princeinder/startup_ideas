const { project } = require("../models/project");

const addProject = (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.json({ error: "all fields are required....." });
  const { name, description } = req.body;
  project.findOne({ name: name }).then((field) => {
    if (field)
      return res.status(401).send({ name: "project name already exists" });
    const Project = new project({
      name,
      description,
    });
    Project.save(function (err, data) {
      if (err) return res.status(401).json({ err });
      res.json({ data, message: "Project added successfully...." });
    });
  });
};

const likeProject = (req, res) => {
  const { projectId, like } = req.body;
  if (like == "add") action = { $push: { likes: req.user._id } };
  if (like == "remove") action = { $pull: { likes: req.user._id } };
  project
    .findByIdAndUpdate(projectId, action, {
      new: true,
    })
    .exec((err, result) => {
      if (err) return res.status(422).json({ error: err });
      project
        .findByIdAndUpdate(
          projectId,
          {
            $pull: { unlikes: req.user._id },
          },
          {
            new: true,
          }
        )
        .exec((err, result) => {
          if (err) return res.status(422).json({ error: err });
          project
            .findByIdAndUpdate(
              projectId,
              {
                $pull: { superlikes: req.user._id },
              },
              {
                new: true,
              }
            )
            .exec((err, data) => {
              console.log(err);
              res.json({ data });
            });
        });
    });
};

const unlikeProject = (req, res) => {
  const { projectId, unlike } = req.body;
  if (unlike == "add") action = { $push: { unlikes: req.user._id } };
  if (unlike == "remove") action = { $pull: { unlikes: req.user._id } };
  project
    .findByIdAndUpdate(projectId, action, {
      new: true,
    })
    .exec((err, result) => {
      if (err) return res.status(422).json({ error: err });
      project
        .findByIdAndUpdate(
          projectId,
          {
            $pull: { likes: req.user._id },
          },
          {
            new: true,
          }
        )
        .exec((err, result) => {
          if (err) return res.status(422).json({ error: err });
          project
            .findByIdAndUpdate(
              projectId,
              {
                $pull: { superlikes: req.user._id },
              },
              {
                new: true,
              }
            )
            .exec((err, data) => {
              res.json({ data });
            });
        });
    });
};

const superlikeProject = (req, res) => {
  const { projectId, superlike } = req.body;
  if (superlike == "add") action = { $push: { superlikes: req.user._id } };
  if (superlike == "remove") action = { $pull: { superlikes: req.user._id } };
  project
    .findByIdAndUpdate(projectId, action, {
      new: true,
    })
    .exec((err, result) => {
      if (err) return res.status(422).json({ error: err });
      project
        .findByIdAndUpdate(
          projectId,
          {
            $pull: { unlikes: req.user._id },
          },
          {
            new: true,
          }
        )
        .exec((err, result) => {
          if (err) return res.status(422).json({ error: err });
          project
            .findByIdAndUpdate(
              projectId,
              {
                $pull: { likes: req.user._id },
              },
              {
                new: true,
              }
            )
            .exec((err, data) => {
              console.log(err);
              res.json({ data });
            });
        });
    });
};

const favouriteProject = (req, res) => {
  const { projectId, favourite } = req.body;
  if (favourite == "add") action = { $push: { favourites: req.user._id } };
  if (favourite == "remove") action = { $pull: { favourites: req.user._id } };
  project
    .findByIdAndUpdate(projectId, action, {
      new: true,
    })
    .exec((err, data) => {
      if (err) return res.status(422).json({ error: err });
      res.json({ data });
    });
};

const getProjects = (req, res) => {
  project.find({}).exec((err, data) => {
    if (err) return res.status(422).json({ error: err });
    res.json({ data });
  });
};
module.exports = {
  addProject,
  likeProject,
  getProjects,
  unlikeProject,
  superlikeProject,
  favouriteProject,
};
