import dotenv from 'dotenv'
// import multer from 'multer'
// import FTPStorage from 'multer-ftp'
// import path from 'path'
import moment from 'moment'
import messages from '../models/messages.js'
import users from '../models/users.js'

dotenv.config()

// req 代表進去的
// res 代表出去的
export const create = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // 如果進來的資料格式不是 json
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    // 回應狀態碼 400 以及訊息
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  // try{}...catch(error){} 同步非同步
  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    }
    result = await users.findOne({ 'orders._id': req.params.order_id })
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (req.session.user._id !== req.params.id) {
      res.status(403).send({ success: false, message: '沒有權限1' })
      console.log(req.session.user._id)
    } else if (!result._id === req.params.id && !req.session.user.account.includes('##')) {
      res.status(403).send({ success: false, message: '沒有權限2' })
      console.log(result._id)
      console.log(req.params.id)
      console.log(!req.session.user.account.includes('##'))
    } else {
      result = await messages.create({
        order_id: req.params.order_id,
        user_account: req.session.user.account,
        user_name: req.session.user.name,
        date: moment().format().substr(0, 16),
        message: req.body.message,
        read: false,
        reply: false
      })
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      // errors: {
      //   欄位: 錯誤訊息
      // }
      // 因為不知道發生的問題是哪個欄位
      // Object.keys 會把 json 的所有 key 拉出來變成陣列，用 [0] 取第一個 key
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
      console.log(error)
    }
  }
}

export const checkOrder = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // if (!req.session.user.account.includes('##')) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  // }
  try {
    const result = await messages.find({ order_id: req.params.order_id })
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const orderUserSum = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // if (!req.session.user.account.includes('##')) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  // }
  try {
    let result = await messages.find({ order_id: req.params.order_id })
    let userSum = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i].user_account === req.session.user.account) {
        userSum++
      }
    }
    result = userSum
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const orderWebmasterSum = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // if (!req.session.user.account.includes('##')) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  // }
  try {
    let result = await messages.find({ order_id: req.params.order_id })
    let userSum = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i].user_account === req.session.user.account) {
        userSum++
      }
    }
    result = result.length - userSum
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const orderSum = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // if (!req.session.user.account.includes('##')) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  // }
  try {
    let result = await messages.find({ order_id: req.params.order_id })
    result = result.length
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const sum = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  // if (!req.session.user.account.includes('##')) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  // }
  try {
    let result = await messages.find({ user_account: req.params.user_account })
    result = result.length
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
    console.log(error)
  }
}
