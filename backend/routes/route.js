const express = require('express');
const router = express.Router();

const upload = require('../middleware/util');
// import upload from '../middleware/util';

const userController = require('../controllers/user');
const authController = require('../controllers/auth');
const searchController = require('../controllers/search');
const projectsController = require('../controllers/project');
const postController = require('../controllers/post');
const commentController = require('../controllers/comment');
const imageController = require('../controllers/image');

router.post('/login', authController.login);
router.post('/register', authController.register);

router.post('/user/update', userController.updateProfile);
router.delete('/user/delete/:email', userController.deleteUser);

router.get('/search', searchController.searchUsers);

router.get('/project/:email', projectsController.getAllProjects);
router.post('/project/create', projectsController.createProject);

router.post('/post/create',postController.createPost);
router.put('/post/update/:id',postController.updatePost);
router.delete('/post/delete/:id',postController.deletePost);
router.get('/post/view/:email',postController.getPost);
router.get('/post/view',postController.getAllPosts);

router.post('/comment/create',commentController.newComment);
router.get('/comment/:id',commentController.getComments);
router.delete('comment/delete/:id',commentController.deleteComment);

router.post('/file/upload', upload.single('file'),imageController.uploadImage);
router.get('/file/:filename',imageController.getImage);

module.exports = router;