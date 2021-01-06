import express from 'express'
import { create, login, logout, heartbeat, edit, addOrder } from '../controllers/users.js'

const router = express.Router()

router.post('/signup', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

router.patch('/:id', edit)
router.post('/order/:id', addOrder)

export default router
