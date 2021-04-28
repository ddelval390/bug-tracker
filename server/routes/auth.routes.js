import express from 'express'
import {connectUser, logOutUser, authenticationCheck} from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/auth/conn', connectUser)
router.get('/auth/logout',logOutUser )
router.get('/auth/authcheck', authenticationCheck)

export default router