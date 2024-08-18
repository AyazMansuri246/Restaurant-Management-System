const mongoose = require('mongoose')

const employeeSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})


const TableSchema = new mongoose.Schema({
    tableName:{
        type : String,
        required:true
    },
    tableSeatingNo:{
        type:Number,
        required:true
    }
}) 


const MenuSchema = new mongoose.Schema({
    mainCategory:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    halfPrice:{
        type:Number
    },
    fullPrice:{
        type:Number
    }
})

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    tables:{
        type: Array,
        required : true
    }

})

const AttendanceSchema = mongoose.Schema({
    waiter : {
        type:String,
        required:true,
    },
    attendance:{
        type:String,
        enum : ["Present","Absent"]
    },
    currentDate:{
        type:String,
        required:true
    }
},{timestamps:true})

const tableAllocation = mongoose.Schema({
    date:String,
    waiter:String,
    tables:Array
})

const Employee = mongoose.model("Employee", employeeSchema);
const Table = mongoose.model("Table",TableSchema);
const Menu = mongoose.model("Menu",MenuSchema);
const User = mongoose.model("User",UserSchema);
const Attendance = mongoose.model("Attendance",AttendanceSchema);
const TableAllocation = mongoose.model("TableAllocation",tableAllocation);


module.exports = {Employee,Table,Menu,User,Attendance,TableAllocation};