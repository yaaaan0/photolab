import express from 'express'
import { create, checkOrder, sum, orderUserSum, orderWebmasterSum, orderSum } from '../controllers/messages.js'

const router = express.Router()

router.post('/:id/:order_id', create)
router.get('/:order_id', checkOrder)

router.get('/:user_account/sum', sum)

// 用訂單編號查詢訂單訊息數量
router.get('/:order_id/orderSum', orderSum)
router.get('/:order_id/orderUserSum', orderUserSum)
router.get('/:order_id/orderWebmasterSum', orderWebmasterSum)

export default router
