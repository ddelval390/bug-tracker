import express from 'express'
import ticketCtrl from '../controllers/ticket.controller.js'
import commentCtrl from '../controllers/comment.controller.js'

const router = express.Router()

router.route('/api/ticket/:ticketId')
    .get(ticketCtrl.returnTicket)
    .patch(ticketCtrl.updateTicket)
    .delete(ticketCtrl.deleteTicket)

router.route('/api/ticket/:ticketId/comments')
    .post(commentCtrl.postComment)

router.route('/api/ticket/:ticketId/comments/:commentId')
    .delete(commentCtrl.deleteComment)

router.param('commentId', commentCtrl.findComment)
router.param('ticketId', ticketCtrl.findTicket)

export default router
