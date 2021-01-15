import express from 'express'

import { create, del, allFile, file, edit } from '../controllers/photos.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', del)
router.get('/', allFile)
router.get('/file/:file', file)

export default router
