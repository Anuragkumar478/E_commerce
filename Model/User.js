const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    address: { type: String }
});

module.exports = mongoose.model('User', userSchema);
//   "_id": "68237a567eb1484a0410a530",
//     "name": "himashu",
//     "email": "himanshu@12345.com",
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjM3YTU2N2V
//     iMTQ4NGEwNDEwYTUzMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NDcxNTU1NDIsImV4cCI
//     6MTc0Nzc2MDM0Mn0.rFW2PfMQGCaQ69VeyGKVWMDFwqjV1rnNdMzlsae8nDY"
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjM3YTU2N2ViMTQ4NGEwNDEwYTUzMCIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3NDcxNTU2ODcsImV4cCI6MTc0Nzc2MDQ4N30.2490f_qlSmEoPeXoSVcOHfOK_ILMsENIsnLf4mZyqhg