// 加密
import md5 from 'md5'

// 日期格式
// import moment from 'moment'

// 讓陣列顯示
// import util from 'util'

import webmasters from '../models/webmasters.js'

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
      const result = await webmasters.create({
        account: req.body.account,
        password: md5(req.body.password),
        name: req.body.name
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
