// 引用資料庫套件
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const photoSchema = new Schema(
  {
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
  },
  {
    versionKey: false
  }
)

const photos = mongoose.model('photos', photoSchema)

export default photos
