// 引用資料庫套件
import mongoose from 'mongoose'

// 驗證
import validator from 'validator'

// 引用重複驗證錯誤訊息套件
// import beautifyUnique from 'mongoose-beautiful-unique-validation'

// mongoose.plugin(beautifyUnique)

import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

const userImageSchema = new Schema(
  {
    p_id: {
      type: mongoose.ObjectId,
      ref: 'photos',
      required: [true, '缺少ID欄位']
    },
    photographer: {
      type: String,
      required: [true, '缺少攝影師欄位']
    },
    project: {
      type: String,
      required: [true, '缺少項目欄位']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    },
    description: {
      type: String,
      maxlength: [200, '說明必須 200 字以下']
    }
  }
)

// const messages = new Schema(
//   {
//     date: {
//       type: Date
//     },
//     content: {
//       type: String
//     }
//   }
// )

const orderSchema = new Schema(
  {
    orderDate: {
      type: String
    },
    agreeStatement: {
      type: Boolean
    },
    date: {
      type: String,
      required: [true, '請輸入日期']
    },
    project: {
      type: String,
      required: [true, '請選擇拍攝項目']
    },
    photographer: {
      type: String,
      required: [true, '請選擇攝影師']
    },
    paid: {
      type: Boolean
    },
    state: {
      type: Boolean
    }
    // messages_sum: {
    //   type: Number
    // },
    // messages_userSum: {
    //   type: Number
    // },
    // messages_webmasterSum: {
    //   type: Number
    // }
  }
)

const userSchema = new Schema(
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
    },
    email: {
      type: String,
      required: [true, '請輸入信箱'],
      // 不可重複，預設只能放 true 或 false，除非使用套件
      unique: true,
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
      required: [true, '請輸入電話號碼'],
      unique: true,
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
    orders: {
      type: [orderSchema]
    }
  },
  {
    // 如果不要紀錄資料修改次數
    versionKey: false
  }
)
userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator', message: ' {PATH} 欄位重複' })

// 建立 model
// mongoose.model(collection名稱, Schema)
// collection名稱必須是複數，結尾加s
const users = mongoose.model('users', userSchema)

export default users
