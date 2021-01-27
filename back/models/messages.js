import mongoose from 'mongoose'

const Schema = mongoose.Schema

const messagesSchema = new Schema(
  {
    order_id: {
      type: mongoose.ObjectId,
      ref: 'users',
      required: true
    },
    user_account: {
      type: String,
      required: true
    },
    user_name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: [true, '請輸入訊息']
    },
    read: {
      type: Boolean,
      required: true
    },
    reply: {
      type: Boolean,
      required: true
    }
  },
  {
    // 如果不要紀錄資料修改次數
    versionKey: false
  }
)

const messages = mongoose.model('messages', messagesSchema)
export default messages
