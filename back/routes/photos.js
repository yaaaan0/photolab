import express from 'express'

import { create, check } from '../controllers/photos.js'

const router = express.Router()

router.post('/', create)
router.get('/', check)

export default router
