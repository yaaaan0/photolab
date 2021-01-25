import express from 'express'

import { allNews, create, del } from '../controllers/news.js'

const router = express.Router()

router.get('/', allNews)
router.post('/', create)
// router.patch('/:id', edit)
router.delete('/:id', del)

export default router