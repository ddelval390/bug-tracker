import express from 'express'
import userCtrl from '../controllers/user.controller.js'

const router = express.Router();

router.route('/api/users')
    .get(userCtrl.getAllUsers)

router.route('/api/users/:role')
    .get(userCtrl.getUsersByRole)

router.route('/api/users/:userId/projects')
    .get(userCtrl.getUserProjects)


export default router