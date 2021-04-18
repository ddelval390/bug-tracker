import express from 'express';
import projectCtrl from '../controllers/project.controller.js'

const router = express.Router();

router.route('/api/projects/')
    .post(projectCtrl.createProject)

router.route('/api/projects/:projectId')
    .get()
    .put()
    .delete()

export default router