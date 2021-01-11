import express from 'express'
import { create } from '../controllers/webmasters.js'

const router = express.Router()

router.post('/signup', create)

export default router
