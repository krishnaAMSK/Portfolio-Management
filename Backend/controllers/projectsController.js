const { getDb } = require('../config/database');
const { ObjectId } = require('mongodb');
const Project = require('../models/Project');
const User = require('../models/user');

const getAllProjects = async (req, res) => {
  try {
    console.log('####');
    const db = getDb();
    const loggedIn = req.isAuthenticated();
    const current = req.user;
    const userId = req.query.userId ? new ObjectId(req.query.userId) : current._id;
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId)}); 
    console.log(`User Id we are seeing: ${userId}`);
    console.log('User data:');
    console.log(user);
    console.log('Current:');
    console.log(current);
    const users = await db.collection('users').find().toArray();
    const userIdMap = {};

    users.forEach(user => {
      userIdMap[user._id.toString()] = user;
    });
   
    let projects; 
    projects = await db.collection('projects').find({ userId: userId }).toArray();
    console.log(projects);
    res.render('about', { loggedIn, userIdMap, user, current, projects });
  } catch (err) {
    console.error('Failed to get projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const db = getDb();
    const userId = req.user._id; 
    const project = new Project(title, description, userId);
    await db.collection('projects').insertOne(project);
    res.redirect('/projects');
  } catch (err) {
    console.error('Failed to create project:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getEditProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const db = getDb();
    console.log(projectId);
    console.log('User ID:' + req.user._id);
    const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId), userId: req.user._id });
    console.log(project);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    res.render('editProject', { project });
  } catch (err) {
    console.error('Failed to get project:', err);
    res.status(500).send('Internal server error');
  }
};

const updateProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const { title, description } = req.body;
    const db = getDb();
    const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId), userId: req.user._id });
    console.log(project);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    await db.collection('projects').updateOne({ _id: new ObjectId(projectId), userId: req.user._id }, { $set: { title, description } });
    res.redirect('/projects');
  } catch (err) {
    console.error('Failed to update project:', err);
    res.status(500).send('Internal server error');
  }
};

const viewProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const db = getDb();

    const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId) });
    if (!project) {
      return res.status(404).send('Project not found');
    }

    const userId = project.userId;
    const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).send('User not found');
    }
    console.log('Im here');
    res.render('viewProject', { user, project });
  } catch (err) {
    console.error('Failed to get project:', err);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getEditProject,
  updateProject,
  viewProject,
};

