import express from 'express'

import { New, allNews, create, del, imgEdit, textEdit } from '../controllers/news.js'

const router = express.Router()

router.get('/', allNews)
router.get('/:id', New)
router.post('/', create)
router.delete('/:id', del)

// 修改圖片和文字
router.patch('/:id/imgEdit', imgEdit)
// 修改純文字
router.patch('/:id/textEdit', textEdit)

export default router
