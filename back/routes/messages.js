import express from 'express'
import { create, checkOrder } from '../controllers/messages.js'

const router = express.Router()

router.post('/:id/:order_id', create)
router.get('/:order_id', checkOrder)

export default router
