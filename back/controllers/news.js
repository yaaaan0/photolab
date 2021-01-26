import dotenv from 'dotenv'
import multer from 'multer'
import FTPStorage from 'multer-ftp'
import path from 'path'
import fs from 'fs'
import moment from 'moment'
import news from '../models/news.js'

dotenv.config()

let storage

// 本機開發，檔案存電腦
// 雲端環境，檔案存 FTP
if (process.env.DEV === 'true') {
  storage = multer.diskStorage({
    destination (req, file, callback) {
      callback(null, 'images/')
    },
    filename (req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname))
    }
  })
} else {
  storage = new FTPStorage({
    // FTP 登入設定
    ftp: {
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false
    },
    // 上傳的路徑含檔名
    // 路徑為 FTP 的絕對路徑
    destination (req, file, options, callback) {
      callback(null, '/' + Date.now() + path.extname(file.originalname))
    }
  })
}

const upload = multer({
  storage,
  fileFilter (req, file, callback) {
    if (!file.mimetype.includes('image')) {
      callback(new multer.MulterError('LIMIT_FORMAT'), false)
    } else {
      callback(null, true)
    }
  },
  limits: {
    fileSize: 1024 * 1024
  }
})

export const create = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.session.user.account.includes('##')) {
    res.status(403).send({ success: false, message: '沒有權限' })
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('multipart/form-data')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      console.log(req.file)
      try {
        let file = ''
        if (process.env.DEV === 'true') {
          file = req.file.filename
        } else {
          file = path.basename(req.file.path)
        }
        const result = await news.create({
          date: moment().format('MMMM Do YYYY'),
          title: req.body.title,
          content: req.body.content,
          file
        })
        res.status(200).send({ success: true, message: '', result })
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
        }
      }
    }
  })
}

export const New = async (req, res) => {
  try {
    const result = await news.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const allNews = async (req, res) => {
  try {
    const result = await news.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const del = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  }
  if (!req.session.user.account.includes('##')) {
    res.status(403).send({ success: false, message: '沒有權限' })
  }
  try {
    let result = await news.findById(req.params.id)
    if (result === null) {
      res.status(400).send({ success: false, message: '找不到資料' })
    } else {
      result = await news.findByIdAndDelete(req.params.id)
      res.status(200).send({ success: true, message: '', result })

      // 刪除本機圖片檔
      if (process.env.DEV === 'true') {
        fs.unlink('images/' + result.file, () => {})
      }
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
export const imgEdit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  }
  if (!req.session.user.account.includes('##')) {
    res.status(403).send({ success: false, message: '沒有權限' })
  }
  upload.single('image')(req, res, async error => {
    if (error instanceof multer.MulterError) {
      let message = ''
      if (error.code === 'LIMIT_FILE_SIZE') {
        message = '檔案太大'
      } else if (error.code === 'LIMIT_FORMAT') {
        message = '格式不符'
      } else {
        message = '上傳錯誤'
      }

      res.status(400).send({ success: false, message })
    } else if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      try {
        let file = ''
        if (process.env.DEV === 'true') {
          // console.log(req.file)
          file = req.file.filename
        } else {
          file = path.basename(req.file.path)
        }

        let result = await news.findById(req.params.id)
        if (result === null) {
          res.status(400).send({ success: false, message: '找不到資料' })
        } else {
          result = await news.findByIdAndUpdate(req.params.id,
            {
              title: req.body.title,
              content: req.body.content,
              file
            }, { new: true })
          res.status(200).send({ success: true, message: '', result })
        }
      } catch (error) {
        if (error.name === 'ValidationError') {
          const key = Object.keys(error.errors)[0]
          const message = error.errors[key].message
          res.status(400).send({ success: false, message })
        } else {
          res.status(500).send({ success: false, message: '伺服器錯誤' })
          console.log(error)
        }
      }
    }
  })
}
export const textEdit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
  }
  if (!req.session.user.account.includes('##')) {
    res.status(403).send({ success: false, message: '沒有權限' })
  }
  try {
    let result = await news.findById(req.params.id)
    if (req.params._id === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await news.findByIdAndUpdate(req.params.id, req.body, { new: true })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
