import express from 'express'
import { create, login, logout, heartbeat, edit } from '../controllers/users.js'

const router = express.Router()

router.post('/signup', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

router.patch('/:id', edit)

export default router
