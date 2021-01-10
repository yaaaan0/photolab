import express from 'express'
import { create, check } from '../controllers/orders.js'

const router = express.Router()

router.post('/:id', create)
router.get('/:id', check)
