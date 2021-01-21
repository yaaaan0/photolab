import express from 'express'

import { create, allFile, file, del } from '../controllers/banners.js'

const router = express.Router()

router.post('/', create)
router.get('/', allFile)
router.get('/:file', file)
router.delete('/:id', del)

export default router
