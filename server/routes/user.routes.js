import express from 'express'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.getAllUsers)

router.route('/api/users/user/:userId')
    .get(userCtrl.returnUser)
    .patch(userCtrl.updateUser)

router.route('/api/users/:role')
    .get(userCtrl.getUsersByRole)

router.route('/api/users/:userId/projects')
    .get(userCtrl.getUserProjects)

router.route('/api/users/:userId/tickets')
    .get(userCtrl.getUserTickets)


    router.param('userId', userCtrl.findUser)
export default router