import mongoose from 'mongoose'

const Schema = mongoose.Schema

const newsSchema = new Schema(
  {
    date: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    file: {
      type: String
    }
  }
)

const news = mongoose.model('news', newsSchema)
export default news
