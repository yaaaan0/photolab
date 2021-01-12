// 引用資料庫套件
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const photoSchema = new Schema(
  {
    photographer: {
      type: String,
      required: [true, '缺少攝影師欄位']
    },
    description: {
      type: String,
      maxlength: [200, '說明必須200字以下']
    },
    project: {
      type: String,
      required: [true, '缺少項目欄位']
    },
    file: {
      type: String,
      required: [true, '缺少檔案名稱']
    },
    width: {
      type: Number,
      required: [true, '缺少檔案寬度']
    },
    height: {
      type: Number,
      required: [true, '缺少檔案高度']
    }
  },
  {
    versionKey: false
  }
)

const photos = mongoose.model('photos', photoSchema)

export default photos
