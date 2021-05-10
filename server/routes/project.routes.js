import express from 'express'
import projectCtrl from '../controllers/project.controller.js'


const router = express.Router()

router.route('/api/project/')
    .post(projectCtrl.createProject)

router.route('/api/project/:projectId')
    .get(projectCtrl.returnProject)
    .delete(projectCtrl.deleteProject)

router.route('/api/project/:projectId/team')
    .post(projectCtrl.updateTeam)

router.route('/api/project/:projectId/tickets')
    .post(projectCtrl.createTicket)


router.param('projectId', projectCtrl.findProject)
export default router