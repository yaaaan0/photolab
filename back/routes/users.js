import express from 'express'
import { create, login, logout, heartbeat, edit, addOrder, checkUser, checkOrder } from '../controllers/users.js'

const router = express.Router()

router.post('/signup', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

router.patch('/:id', edit)
router.get('/:id', checkUser)
router.post('/order/:id', addOrder)
router.get('/order/:id', checkOrder)

export default router
