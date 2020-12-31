import mongoose from 'mongoose'
import validator from 'validator'

const Schema = mongoose.Schema

const userImageSchema = new Schema(
  {
    file: {
      type: String
    },
    display: {
      type: Boolean
    }
  }
)

const messages = new Schema(
  {
    date: {
      type: Date
    },
    content: {
      type: String
    }
  }
)

const orderSchema = new Schema(
  {
    date: {
      type: Date
    },
    project: {
      type: String
    },
    photographer: {
      type: []
    },
    paid: {
      type: Boolean
    },
    state: {
      type: Boolean
    },
    messages: {
      type: [messages]
    }
  }
)

const userSchema = new Schema(
  {
    account: {
      type: String,
      minlength: [4, '帳號必須四個字以上'],
      maxlength: [20, '帳號必須二十個字以下'],
      unique: true,
      required: '請輸入帳號'
    },
    password: {
      type: String,
      unique: true,
      required: '請輸入密碼'
    },
    name: {
      type: String,
      required: [true, '請輸入姓名']
    },
    email: {
      type: String,
      required: [true, '請輸入信箱'],
      // 不可重複，預設只能放 true 或 false，除非使用套件
      unique: '信箱重複',
      // 自訂驗證規則
      validate: {
        // 驗證 function
        validator (value) {
          return validator.isEmail(value)
        },
        // 錯誤訊息
        message: '信箱格式錯誤'
      }
    },
    phoneNumber: {
      type: String,
      required: '請輸入電話號碼',
      validate: {
        validator (value) {
          return validator.isMobilePhone(value)
        },
        message: '電話號碼格式錯誤'
      }
    },
    images: {
      type: [userImageSchema]
    },
    order: {
      type: [orderSchema]
    }
  },
  {
    // 如果不要紀錄資料修改次數
    versionKey: false
  }
)

// 建立 model
// mongoose.model(collection名稱, Schema)
// collection名稱必須是複數，結尾加s
const users = mongoose.model('users', userSchema)

export default users
