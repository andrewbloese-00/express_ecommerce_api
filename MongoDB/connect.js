require('dotenv').config();
const mongoose = require('mongoose');
const connectMongo = async () => {
 try {
  mongoose.connect(`${process.env.MONGO_URI}`, 
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   })
  } catch (e) {
    console.error('MongoDB connection FAILED ❌')
    console.error(e)
    process.exit(1)
  }
  console.log('DB Connection Success ✅')


}

module.exports = connectMongo;