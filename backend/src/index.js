const express = require("express");
require("../src/db/conn");
const {
  Employee,
  Table,
  Menu,
  User,
  Attendance,
  TableAllocation,
  Orders,
  Log
} = require("./schema/Schema");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const data = new Employee(req.body);
    const createEmployee = await data.save();
    res.status(200).send("done");
  } catch (e) {
    console.log(e);
  }
});

// app.post("/login", async(req,res)=>{
//     try{
//         const {email,password} = req.body;
//         const result = await Employee.findOne({email:email});
//         if(result){
//             if(result.password == password){
//                 res.send("Success")
//             }
//             else{
//                 res.send("wrong password")
//             }
//         }
//         else{
//             res.send("Account not registered")
//         }

//     }
//     catch(e){
//         console.log("This is ",e);
//     }
// })

app.post("/login", async(req, res) => {
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if(user){
      if(user.password === password){
        res.send([user.role,user.tables]);
      }
      else{
        res.send("Wrong Password")
      }
    }
    else{
      res.send("No User");
    }

  }catch(e){
    console.log(e);
  }
});

app.post("/home/table", async (req, res) => {
  try {
    // console.log(req.body)
    const data = new Table(req.body);
    // console.log(data.tableName)
    const result = await Table.findOne({ tableName: data.tableName });
    // console.log(result)
    if (result) {
      console.log("Data already present");
      res.send("present");
    } else {
      const tablecreation = await data.save();
      // console.log(tablecreation)
      console.log("Data Added");
      res.status(200).send("added");
    }
  } catch (e) {
    console.log("error in creating table ", e);
  }
});

app.get("/home/table", async (req, res) => {
  try {
    const result = await Table.find();
    console.log(result);
    res.send(result);
  } catch (e) {
    console.log("error in fetching the table ", e);
  }
});

app.delete("/home/table", async (req, res) => {
  try {
    // console.log(req.query.tableName)   //to use req.query as for delete we have to pass the data through url parameter
    const del = await Table.deleteOne({ tableName: req.query.tableName });
    // console.log(del);
    res.send("done");
  } catch (e) {
    console.log("Error in deleting ", e);
  }
});

//Menu Section API

app.post("/home/menu", async (req, res) => {
  try {
    // console.log(req.body)
    const data = new Menu(req.body);
    const createMenu = await data.save();
    console.log(createMenu);
    if (createMenu) {
      res.status(200).send("Menu Added");
    }
  } catch (e) {
    console.log("Error in creating menu ", e);
  }
});

app.get("/home/menu", async (req, res) => {
  try {
    const menuData = await Menu.find();
    console.log(menuData);
    res.send(menuData);
  } catch (e) {
    console.log("Error in backend side getting menu data ", e);
  }
});

app.delete("/home/menu", async (req, res) => {
  try {
    // console.log(req.query)
    const del = await Menu.deleteOne({
      mainCategory: req.query.mainCategory,
      subCategory: req.query.subCategory,
    });
    // console.log(del);
    res.send("deleted");
  } catch (e) {
    console.log("error on deleting, backend side ", e);
  }
});

//table Section

app.post("/home/user", async (req, res) => {
  try {
    // console.log(req.body)
    const data = new User(req.body);
    console.log(data);
    const result = await User.findOne({ username: data.username });
    console.log(result);
    if (!result) {
      const createUser = await data.save();
      console.log(createUser);
      res.status(200).send("User Added");
    } else {
      res.send("Username or email already exist");
    }
  } catch (e) {
    console.log("Error on backend side on adding user ", e);
  }
});

app.get("/home/user", async (req, res) => {
  const users = await User.find();
  // console.log(users);
  if (users) {
    res.send(users);
  } else {
    res.send("No User found");
  }
});

app.delete("/home/user", async (req, res) => {
  try {
    const { username, email } = req.query;
    // console.log(username);
    const delUser = await User.deleteOne({ username: username, email: email });
    // console.log("deleted user ",delUser);
    res.send("User Deleted");
  } catch (e) {
    console.log("Error on backend side ", e);
  }
});

app.get("/home/user/allocation", async (req, res) => {
  try {
    let date = new Date().toLocaleDateString("en-GB");
    const result = await TableAllocation.find({date});
    console.log("the rwesulkt o s ",result )
    if(result.length!=0){
        res.send(result);
    }
    else{
        res.send("Not Allocated");
    }
    
  } catch (e) {
    console.log(e);
  }
});

//Attendance section

app.get("/home/attendance/waiter", async (req, res) => {
  try {
    const waiter = await User.find({ role: "waiter" });
    // console.log(waiter);
    res.send(waiter);
  } catch (e) {
    console.log("error on fetching waiter backend side ", e);
  }
});

app.post("/home/attendance", async (req, res) => {
  try {
    // console.log("this is body ", req.body)
    const addAttendance = await new Attendance(req.body).save();
    // console.log(addAttendance);
    res.send("added");
  } catch (e) {
    console.log("error on adding attendance backend side", e);
  }
});

app.get("/home/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find();
    // console.log(attendance);

    let date = new Date().toLocaleDateString("en-GB");
    const waiter = await User.find({ role: "waiter" });
    const attendanceDate = await Attendance.find({ currentDate: date });
    console.log("waiters are ",waiter);
    console.log("attendance are ",attendanceDate);
    const getLastAllocated = async (table) => {
      const result = await TableAllocation.find({ date: date });
      console.log(result);
      const arr = [];
      for (const allocation of result){
        console.log("this is allocation", allocation);
        arr.push(allocation.tables.length);
      };
      let min = Math.min(...arr);
      console.log(arr);
      console.log("this min is ", min);

      for (const allocation of result){
        if (allocation.tables.length === min) {
          console.log(table);
          const update = await TableAllocation.findOneAndUpdate(
            { date:date,waiter: allocation.waiter },
            { $set: { tables: [...allocation.tables, ...table] } }
          );
          console.log(update);
          console.log(allocation);
          
          break; // This will exit the loop
        }
      }
    };

    // let table = [];
    // let cnt = 0;
    // const result = await TableAllocation.find({date:date});

    // if(attendanceDate.length === waiter.length && result.length==0){
    //     waiter.forEach((singleWaiter)=>{
    //         cnt++;
    //         attendanceDate.forEach(async(attendee)=>{
    //             if(attendee.waiter === singleWaiter.username){
    //                 if(attendee.attendance === "Present"){
    //                     console.log(singleWaiter.username,"present");
    //                     if(table.length !=0){
    //                         const newTable = [...singleWaiter.tables,...table];
    //                         // console.log("the table is ",table)
    //                         // console.log("the new table is ",newTable)
    //                         const allocation = await new TableAllocation({date,waiter:singleWaiter.username,tables:newTable}).save();
    //                         console.log(allocation);
    //                         table = [];
    //                     }
    //                     else{
    //                         const allocation = await new TableAllocation({date,waiter:singleWaiter.username,tables:singleWaiter.tables}).save();
    //                         console.log(allocation);
    //                     }
    //                 }else{
    //                     console.log(singleWaiter.username,"absent");
    //                     table.push(...singleWaiter.tables);
    //                     if(cnt === waiter.length){
    //                         console.log("hii ",cnt)
    //                         getLastAllocated(table);
    //                     }

    //                 }
    //             }
    //         })
    //     })
    // }
    let table = [];
    let cnt = 0;
    const result = await TableAllocation.find({ date: date });

    if (attendanceDate.length === waiter.length && result.length === 0) {
      
      for (const singleWaiter of waiter) {
        cnt++;
        for (const attendee of attendanceDate) {
          if (attendee.waiter === singleWaiter.username) {
            if (attendee.attendance === "Present") {
              console.log(singleWaiter.username, "present");

              const newTable =
                table.length !== 0
                  ? [...singleWaiter.tables, ...table]
                  : singleWaiter.tables;

              try {
                const allocation = await new TableAllocation({
                  date,
                  waiter: singleWaiter.username,
                  tables: newTable,
                }).save();
                console.log(allocation);
                table = []; // Reset the table array after successful allocation
              } catch (error) {
                console.error("Error saving TableAllocation:", error);
              }
            } else {
              console.log(singleWaiter.username, "absent");
              table.push(...singleWaiter.tables);
              if (cnt === waiter.length) {
                console.log("hii ", cnt);
                getLastAllocated(table);
              }
            }
          }
        }
      }
    }

    res.send(attendance);
  } catch (e) {
    console.log("Error on fetching attendance data frontend side ", e);
  }
});

app.get("/home/attendance/bool", async (req, res) => {
  try {
    console.log("inside bool");
    let date = new Date().toLocaleDateString("en-GB");
    console.log(date);
    const attendanceDate = await Attendance.find({ currentDate: `${date}` });
    console.log(attendanceDate);
    const arr = [];
    attendanceDate.forEach((att) => {
      arr.push(att.waiter);
    });
    console.log(arr);
    res.send(arr);

    // const waiter = await User.find({role:"waiter"});
    // if(attendanceDate.length !=  waiter.length){
    //     res.send(false);
    // }
    // else{
    //     res.send(true);
    // }
  } catch (e) {
    console.log("Error ", e);
  }
});


app.post("/waiter/order",async(req,res)=>{
  try{
    const data = await new Orders(req.body).save();
    console.log("orders are ",data);
    res.send("saved");
  }catch(e){
    console.log("error on saving order on backend side ",e);
  }
})


app.post("/waiter/log",async(req,res)=>{
  try{  
    // console.log(req.body);
    const data = await new Log(req.body).save();
    console.log(data);
    res.send("Log Added")
     
  }catch(e){
    console.log("error on svaing log backend side",e);
  }
})






app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
