const { getDb } = require('../config/database');
const { ObjectId } = require('mongodb');
const Project = require('../models/Project');
const User = require('../models/user');

const getAllProjects = async (req, res) => {
  try {
    const db = getDb();
    // const projects = await db.collection('projects').find().toArray();
    const loggedIn = req.session.loggedIn || false;
    const userEmail = req.session.user && req.session.user.email;
    const userId = req.session.user._id; 
    const userRole = userEmail ? await User.getRole(userEmail) : null;
    const isAdmin = userRole === 'admin';
    const users = await db.collection('users').find().toArray();
    const userIdMap = {};

    users.forEach(user => {
      userIdMap[user._id.toString()] = user;
    });
   
    let projects;

    if (req.query.userId) {
      const userIdParam = req.query.userId;
      projects = await db.collection('projects').find({ userId: userIdParam }).toArray();
    } 
    else {
      projects = await db.collection('projects').find().toArray();
    }

    res.render('about', { loggedIn, userIdMap, isAdmin, userId, projects });
  } catch (err) {
    console.error('Failed to get projects:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createProject = async (req, res) => {
  try {
    const { title, description } = req.body;
    const db = getDb();
    const userId = req.session.user._id; 
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
    console.log('User ID:' + req.session.user._id);
    const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId), userId: req.session.user._id });
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
    const project = await db.collection('projects').findOne({ _id: new ObjectId(projectId), userId: req.session.user._id });
    console.log(project);
    if (!project) {
      return res.status(404).send('Project not found');
    }
    await db.collection('projects').updateOne({ _id: new ObjectId(projectId), userId: req.session.user._id }, { $set: { title, description } });
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

