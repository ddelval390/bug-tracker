import express from 'express';
import projectCtrl from '../controllers/project.controller.js'

const router = express.Router();

router.route('/api/projects/')
    .post(projectCtrl.createProject)

router.route('/api/projects/:title')
    .get(projectCtrl.returnProject)
    .put()
    .delete()

router.route('/api/projects/:title/team')
    .post(projectCtrl.updateTeam)

router.route('/api/projects/:title/tickets', 'first_name last_name email')
    .post(projectCtrl.createTicket)

router.route('/api/projects/ticket/:ticketId')
    .get(projectCtrl.returnTicket)
    .patch(projectCtrl.updateTicket)

router.route('/api/projects/ticket/:ticketId/comments')
    .post(projectCtrl.postComment)


router.param('ticketId', projectCtrl.findTicket)
router.param('title', projectCtrl.findProject)
export default router