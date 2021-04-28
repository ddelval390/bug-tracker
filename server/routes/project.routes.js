import express from 'express'
import projectCtrl from '../controllers/project.controller.js'


const router = express.Router()

router.route('/api/projects/')
    .post(projectCtrl.createProject)

router.route('/api/projects/:projectId')
    .get(projectCtrl.returnProject)
    .delete(projectCtrl.deleteProject)

router.route('/api/projects/:projectId/team')
    .post(projectCtrl.updateTeam)

router.route('/api/projects/:projectId/tickets')
    .post(projectCtrl.createTicket)

router.route('/api/projects/ticket/:ticketId')
    .get(projectCtrl.returnTicket)
    .patch(projectCtrl.updateTicket)
    .delete(projectCtrl.deleteTicket)

router.route('/api/projects/ticket/:ticketId/comments')
    .post(projectCtrl.postComment)

router.route('/api/projects/ticket/:ticketId/comments/:commentId')
    .delete(projectCtrl.deleteComment)

router.param('commentId', projectCtrl.findComment)
router.param('ticketId', projectCtrl.findTicket)
router.param('projectId', projectCtrl.findProject)
export default router