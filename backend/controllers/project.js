const Project = require('../models/project');
const User = require('../models/user');

const getAllProjects = async (req, res) => {
  try {
    const email = req.params.email;
    // console.log('hollup')
    // console.log(email);
    const user = await User.findOne({ email });
    const projects = await Project.find({ email });
    res.status(200).json({ user, projects });
  } catch (err) {
    console.error('Failed to get projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const { email, title, description, sourceLink } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const project = {
      name: title,
      description: description,
      source: sourceLink,
    };

    const owner = await Project.findOne({ email: email });

    if (!owner) {
      const newOwner = new Project({ email: email, projects: [project] });
      await newOwner.save();
    } else {
      owner.projects.push(project);
      await owner.save();
    }

    res.status(201).json({ message: 'Project created successfully' });
  } catch (err) {
    console.error('Failed to create project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//update
const projectUpdate = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (err) {
    console.error('Failed to update project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a project
const projectDelete = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    console.error('Failed to delete project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//specific
const getSpecific = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch (err) {
    console.error('Failed to get project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllProjects,
  createProject
};
