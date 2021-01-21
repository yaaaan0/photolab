// 引用資料庫套件
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bannerSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    file: {
      type: String,
      required: true
    },
    display: {
      type: Boolean,
      required: true
    }
  },
  {
    versionKey: false
  }
)

const banners = mongoose.model('banners', bannerSchema)
export default banners
