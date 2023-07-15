// routes/projects.js

const express = require('express');
const router = express.Router();

// Project model (assuming you have a "projects" collection in MongoDB)
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Failed to get projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific project by ID
router.get('/:id', async (req, res) => {
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
});

// Create a new project
router.post('/', async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.error('Failed to create project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a project
router.put('/:id', async (req, res) => {
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
});

// Delete a project
router.delete('/:id', async (req, res) => {
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
});

module.exports = router;
