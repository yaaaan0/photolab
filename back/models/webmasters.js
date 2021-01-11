// 引用資料庫套件
import mongoose from 'mongoose'

import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const webmasterSchema = new Schema(
  {
    account: {
      type: String,
      minlength: [4, '帳號必須四個字以上'],
      maxlength: [20, '帳號必須二十個字以下'],
      unique: true,
      required: [true, '請輸入帳號']
    },
    password: {
      type: String,
      unique: false,
      required: [true, '請輸入密碼']
    },
    name: {
      type: String,
      unique: false,
      required: [true, '請輸入姓名']
    }
  },
  {
    // 如果不要紀錄資料修改次數
    versionKey: false
  }
)

webmasterSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator', message: ' {PATH} 欄位重複' })

// 建立 model
// mongoose.model(collection名稱, Schema)
// collection名稱必須是複數，結尾加s
const webmasters = mongoose.model('webmasters', webmasterSchema)

export default webmasters
