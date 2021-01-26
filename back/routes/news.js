import express from 'express'

import { New, allNews, create, del, edit } from '../controllers/news.js'

const router = express.Router()

router.get('/', allNews)
router.get('/:id', New)
router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', del)

export default router
