const mongoose = require('mongoose')
mongoose.set('strictQuery', true)
const atlat = "mongodb+srv://duyph34554:E79RcH55PWoCfwv4@cluster0.v1aoxab.mongodb.net/"
const connect = async () => {
    try {
        await mongoose.connect(atlat,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
        )
        console.log("thanh cong");
    } catch (error) {
        console.log(error);
        console.log("That bai");
    }
}
module.exports = {connect}