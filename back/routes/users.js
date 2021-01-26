import express from 'express'
import {
  create,
  login,
  logout,
  heartbeat,
  edit,
  addOrder,
  checkUser,
  allUser,
  editUser,
  checkOrder,
  addImage,
  checkImage,
  editImage,
  delImage
  // addMsg,
  // checkMsg
} from '../controllers/users.js'

const router = express.Router()

// 使用者登入登出
router.post('/signup', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)

// 查詢所有使用者
router.get('/', allUser)
// 修改訂單資訊
router.patch('/:order_id', editUser)

// 訂單
router.patch('/:id', edit)
router.get('/:id', checkUser)
router.post('/order/:id', addOrder)
router.get('/order/:id', checkOrder)

// 收藏
router.post('/image/:id', addImage)
router.get('/image/:id', checkImage)
router.patch('/image/:id', editImage)
router.delete('/image/:id/:p_id', delImage)

// 訊息
// router.post('/message/:order_id', addMsg)
// router.get('/message/:id/:order_id', checkMsg)
// router.patch('/message/:id', editImage)
// router.delete('/message/:id/:p_id', delImage)
export default router
