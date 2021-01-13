import express from 'express'

import { create, allFile, file } from '../controllers/photos.js'

const router = express.Router()

router.post('/', create)
router.get('/', allFile)
router.get('/file/:file', file)

export default router
