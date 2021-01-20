import express from 'express'
import { create, login, logout, heartbeat, edit, addOrder, checkUser, allUser, checkOrder, addImage, checkImage, editImage, delImage } from '../controllers/users.js'

const router = express.Router()

router.post('/signup', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

// 查詢所有使用者
router.get('/', allUser)

router.patch('/:id', edit)
router.get('/:id', checkUser)
router.post('/order/:id', addOrder)
router.get('/order/:id', checkOrder)

router.post('/image/:id', addImage)
router.get('/image/:id', checkImage)
router.patch('/image/:id', editImage)
router.delete('/image/:id/:p_id', delImage)
export default router
