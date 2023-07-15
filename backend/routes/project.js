const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/project');

router.get('/:email', projectsController.getAllProjects);
router.post('/create', projectsController.createProject);
// router.get('/:id/edit', projectsController.getEditProject);
// router.post('/:id/edit', projectsController.updateProject);
// router.get('/view', projectsController.viewProject);

// router.get('/search/projects/:id', projectController.viewProject); // Move viewProject route above getAllProjects route
// router.get('/projects', projectController.getAllProjects);
// router.get('/projects/create', projectController.getCreateProject);
// router.post('/projects/create', projectController.createProject);
// router.get('/projects/:id/edit', projectController.getEditProject);
// router.post('/projects/:id/edit', projectController.updateProject);
module.exports = router;
