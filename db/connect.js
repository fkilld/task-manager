const mongoose = require('mongoose')
require('dotenv').config()

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`MongoDB connected: ${mongoose.connection.host}`)
  } catch (error) {
    console.error('An error occurred:', error)
    process.exit(1)
  }
}
