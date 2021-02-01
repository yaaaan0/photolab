// 加密
import md5 from 'md5'

import moment from 'moment'

// 讓陣列顯示
// import util from 'util'

import users from '../models/users.js'

// req 代表進去的
// res 代表出去的
export const create = async (req, res) => {
  // 如果進來的資料格式不是 json
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    // 回應狀態碼 400 以及訊息
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  // try{}...catch(error){} 同步非同步
  try {
    if (req.body.password.length < 4) {
      res.status(400).send({ success: false, message: '密碼必須四個字以上' })
    } else if (req.body.password.length > 20) {
      res.status(400).send({ success: false, message: '密碼必須二十個字以下' })
    } else {
      const result = await users.create({
        account: req.body.account,
        password: md5(req.body.password),
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
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
    }
  }
}

export const login = async (req, res) => {
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    const result = await users.findOne({
      account: req.body.account,
      password: md5(req.body.password)
    }, '-password')

    if (result === null) {
      res.status(404).send({ success: false, message: '帳號或密碼錯誤' })
    } else {
      req.session.user = result
      res.status(200).send({ success: true, message: '', result })
    }
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

export const logout = async (req, res) => {
  req.session.destroy(error => {
    if (error) {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    } else {
      res.clearCookie()
      res.status(200).send({ success: true, message: '' })
    }
  })
}

export const heartbeat = async (req, res) => {
  let isLogin = false
  if (req.session.user !== undefined) {
    isLogin = true
  }
  res.status(200).send({
    isLogin,
    message: req.session.user
  })
}

export const edit = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }

  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else if (result.id !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else if (req.body.phoneNumber.length < 10 || req.body.phoneNumber.length > 10) {
      res.status(400).send({ success: false, message: '電話號碼格式錯誤' })
    } else {
      result = await users.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, context: 'query', new: true })
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

export const allUser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.session.user.account.includes('##')) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await users.find()
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editUser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.session.user.account.includes('##')) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await users.findOneAndUpdate(
      {
        'orders._id': req.params.order_id
      }, {
        $set: {
          'orders.$.paid': req.body.paid,
          'orders.$.state': req.body.paid
        }
      },
      { new: true }
    )
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
    console.log(error)
  }
}

export const addOrder = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
  }

  try {
    if (req.body.agreeStatement !== true) {
      res.status(400).send({ success: false, message: '是否同意拍攝說明' })
    } else if (req.body.date.length === 0) {
      res.status(400).send({ success: false, message: '請輸入日期' })
    } else if (req.body.project.length === 0) {
      res.status(400).send({ success: false, message: '請選擇拍攝項目' })
    } else if (req.body.photographer.length === 0) {
      res.status(400).send({ success: false, message: '請選擇攝影師' })
    } else {
      users.findByIdAndUpdate(req.params.id,
        {
          $push: {
            orders: {
              orderDate: moment().format().substr(0, 10),
              agreeStatement: req.body.agreeStatement,
              date: req.body.date,
              project: req.body.project,
              photographer: req.body.photographer,
              paid: false,
              state: false
              // messages_sum: 0,
              // messages_userSum: 0,
              // messages_otherSum: 0
            }
          }
        }, { new: true }).then(result => {
        // console.log(util.inspect(result, { showHidden: true, depth: null }))
        res.status(200).send({ success: true, message: '', result })
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: error.message })
    }
  }
}
export const addImage = async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
  }

  try {
    const result = await users.findById(req.params.id)
    if (result.id !== req.session.user._id) {
      res.status(403).send({ success: false, message: '沒有權限' })
    } else {
      users.findByIdAndUpdate(req.params.id,
        {
          $push: {
            images: {
              p_id: req.body.p_id,
              photographer: req.body.photographer,
              project: req.body.project,
              file: req.body.file,
              description: req.body.description
            }
          }
        }, { new: true }).then(result => {
        // console.log(util.inspect(result, { showHidden: true, depth: null }))
        res.status(200).send({ success: true, message: '', result })
      })
    }
  } catch (error) {
    if (error.name === 'ValidationError') {
      const key = Object.keys(error.errors)[0]
      const message = error.errors[key].message
      res.status(400).send({ success: false, message })
    } else if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: error.message })
    }
  }
}

// 用使用者ID 查詢使用者資料
export const checkUser = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.id) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await users.findById(req.params.id)
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
// 用使用者ID 查詢訂單資料
export const checkOrder = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.id) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await users.findById(req.params.id, 'orders')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}
export const checkImage = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.id) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    const result = await users.findById(req.params.id, 'images')
    res.status(200).send({ success: true, message: '', result })
  } catch (error) {
    res.status(500).send({ success: false, message: '伺服器錯誤' })
  }
}

export const editImage = async (req, res) => {
  // if (req.session.user === undefined) {
  //   res.status(401).send({ success: false, message: '未登入' })
  //   return
  // }
  // if (req.session.user._id !== req.params.id) {
  //   res.status(403).send({ success: false, message: '沒有權限' })
  //   return
  // }
  if (!req.headers['content-type'] || !req.headers['content-type'].includes('application/json')) {
    res.status(400).send({ success: false, message: '資料格式不符' })
    return
  }
  try {
    let result = await users.findById(req.params.id)
    if (req.params._id === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndUpdate(req.params.id, req.body, { new: true })
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

export const delImage = async (req, res) => {
  if (req.session.user === undefined) {
    res.status(401).send({ success: false, message: '未登入' })
    return
  }
  if (req.session.user._id !== req.params.id) {
    res.status(403).send({ success: false, message: '沒有權限' })
    return
  }
  try {
    let result = await users.findById(req.params.id)
    if (result === null) {
      res.status(404).send({ success: false, message: '找不到資料' })
    } else {
      result = await users.findByIdAndUpdate(
        {
          _id: req.params.id
        },
        {
          $pull: {
            // 陣列欄位名稱
            images: {
              // 刪除條件
              p_id: req.params.p_id
            }
          }
        }
      )
      res.status(200).send({ success: true, message: '', result })
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.status(400).send({ success: false, message: 'ID 格式錯誤' })
    } else {
      res.status(500).send({ success: false, message: '伺服器錯誤' })
    }
  }
}
