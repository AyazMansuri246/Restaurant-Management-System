const mongoose = require('mongoose')

const connection = mongoose.connect("mongodb://localhost:27017/employee")
.then(()=>{
    console.log("Db connection successful");
})
.catch((e)=>{
    console.log("Db connnection failed")
})

module.exports = connection;