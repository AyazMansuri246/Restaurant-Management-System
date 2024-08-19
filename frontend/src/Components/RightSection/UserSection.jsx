import React, { useEffect, useState } from "react";
import "../../styles/User.css";
import axios from "axios";

const UserSection = () => {
  const [showOption, setOption] = useState(false);
  const [userData,setUserData] = useState([]);
  const [table,setTable] = useState([]);
  const [UserAllocation,setUserAllocation] = useState([]);
  const [showAllocation,setShowAllocation] = useState(false);
  // const [render,setRender] = useState(0);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    tables: [],
  });

  function inputHandler(e) {
    const { value, name } = e.target;
    // console.log(value,name)
    if (name == "tables") {
      console.log("inside table");
    }
    setUser((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  }

  function checkboxEvent(e) {
    // console.log(e.target.checked);
    // console.log(e.target.name);
    let name = e.target.name;
    if (e.target.checked) {
      setUser((preval) => {
        return {
          ...preval,
          tables: [...preval.tables, e.target.name],
        };
      });
    } else {
      setUser((preval) => {
        return {
          ...preval,
          tables: preval.tables.filter((table) => table != name),
        };
      });
    }
  }

  async function addUser() {
    console.log("the user is ", user);
    const res = await axios.post("/home/user", user);
    getUsers();
    alert(res.data);
    
  }


  async function deleteUser(username,email){
    try{
      if(window.confirm("Are you Sure, you want to delete it ?")){
        const res = await axios.delete(`/home/user?username=${username}&email=${email}`);
        // console.log("deleted ",res);
        getUsers();

      }
    }catch(e){
      console.log("Error on deleting on frontend side ",e);
    }
  }


  async function getUsers() {
    try {
      const users = await axios.get("/home/user");
      const tableData = await axios.get("/home/table");
      // console.log(tableData.data);
      setTable(tableData.data);
      if (Array.isArray(users.data)) {
        // console.log(users.data);
        setUserData(users.data);
      } else {
        alert("No users found");
      }
    } catch (e) {
      console.log("error on frontend side getting users ", e);
    }
  }


  async function getAllocation(){
    try{
      const data = await axios.get("/home/user/allocation");
      console.log("the allocation is ",data);
      if(data.data == "Not Allocated"){
        setShowAllocation(false);
      }else{
        setUserAllocation(data.data);
        setShowAllocation(true);
      }
    }catch(e){
      console.log("error on fetching allocated user frontend side ",e);
    }
  }




  useEffect(() => {
    getUsers();
    getAllocation();
  }, []);

  return (
    <div style={{backgroundColor: "#1F1D2B",height:"90vh"}}>
      <div style={{ padding: "10px", fontSize: "1.3rem",backgroundColor: "#1F1D2B",color:"white" }}>User Management</div>

      {/* <button className="addUser">Add User</button> */}
      <div className="addUser" style={{backgroundColor: "#1F1D2B"}}>
        <div className="userField">
          <input
            type="text"
            placeholder="UserName"
            name="username"
            onChange={inputHandler}
            style={{
              height: "35px",
              width:"200px",
              borderRadius: "4px",
              border: "1px solid black",
              margin:"0 10px"
            }}
          />
        </div>
        <div className="userField">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={inputHandler}
            style={{
              height: "35px",
              width:"250px",
              borderRadius: "4px",
              border: "1px solid black",
              margin:"0 10px"
            }}
          />
        </div>
        <div className="userField">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={inputHandler}
            style={{
              height: "35px",
              width:"200px",
              borderRadius: "4px",
              border: "1px solid black",
              margin:"0 10px"
            }}
          />
        </div>
        <div className="userField">
          <select
            name="role"
            id=""
            onChange={inputHandler}
            style={{ height: "35px", borderRadius: "4px",margin:"0 10px",color:"white",backgroundColor:" #413E3E",width:"100px"}}
          >
            <option value="Role">Role</option>
            <option value="admin">Admin</option>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
          </select>
        </div>

        <div className="userField selectTables" style={{height:"35px"}}>
          <div
            name="tables"
            id=""
            style={{
              width: "200px",
              height:"35px",
              display: "flex",
              justifyContent: "space-between",
              alignItems:"center",
              fontSize: "1.12rem",
              color:"white"
              
            }}
            onClick={() => {
              if (showOption == true) {
                setOption(false);
              } else {
                setOption(true);
              }
            }}
          >
            {/* <option value="sv">select value</option> */}
            select Table
            <button
              
              style={{ all: "unset",backgroundColor:" #413E3E",color:"white",margin:"0 5px",fontSize:".8rem" }}
            >
              &#x25BC;
            </button>
          </div>

          {showOption && (
            <>
              <div className="optionValue">
                <div
                  className="option"
                  style={{
                    border: "1px solid black",
                    width: "200px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "2px 10px",
                    borderRadius: "3px",
                    backgroundColor: "#413E3E",
                    color:"white"
                  }}
                >
                  <label htmlFor="Table1">ALL</label>
                  <input
                    type="checkbox"
                    name="ALL"
                    id=""
                    onChange={checkboxEvent}
                    checked={user.tables.includes("ALL")}
                    style={{width: "20px",height: "21px"}}
                  />
                </div>
              </div>

              {table.map((t)=>{
                return(
                <div className="optionValue">
                  <div
                    className="option"
                    style={{
                      border: "1px solid black",
                      width: "200px",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "2px 10px",
                      borderRadius: "3px",
                      backgroundColor: "#413E3E",
                      color:"white"
                      // backgroundColor: "white",
                    }}
                  >
                    <label htmlFor="Table1">{t.tableName}</label>
                    <input
                      type="checkbox"
                      name={t.tableName}
                      id=""
                      onChange={checkboxEvent}
                      checked={user.tables.includes(t.tableName)}
                      style={{width: "20px",height: "21px"}}
                    />
                  </div>
                </div>
                )
              })}

              {/* <div className="optionValue">
                <div
                  className="option"
                  style={{
                    border: "1px solid black",
                    width: "185px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "2px 10px",
                    borderRadius: "3px",
                    backgroundColor: "white",
                  }}
                >
                  <label htmlFor="Table2">Table2</label>
                  <input
                    type="checkbox"
                    name="table2"
                    id=""
                    onChange={checkboxEvent}
                    checked={user.tables.includes("table2")}
                  />
                </div>
              </div>
              <div className="optionValue">
                <div
                  className="option"
                  style={{
                    border: "1px solid black",
                    width: "185px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "2px 10px",
                    borderRadius: "3px",
                    backgroundColor: "white",
                  }}
                >
                  <label htmlFor="Table3">Table3</label>
                  <input
                    type="checkbox"
                    name="table3"
                    id=""
                    onChange={checkboxEvent}
                    checked={user.tables.includes("table3")}
                  />
                </div>
              </div> */}
            </>
          )}
        </div>

        <button type="submit" onClick={addUser} className="userSubmitBtn">
          Submit
        </button>
      </div>
        
      <div className="userLogData" style={{height:"35%"}}>
        <div className="userTitles" style={{color:"white",height:"16%"}}>
          <div className="userTitle" style={{ width: "15%",height:"35px",display:"flex",alignItems:"center" }}>UserName</div>
          <div className="userTitle" style={{ width: "23%",height:"35px",display:"flex",alignItems:"center"  }}>
            Email
          </div>
          <div className="userTitle" style={{ width: "17%",height:"35px",display:"flex",alignItems:"center"  }}>Password</div>
          <div className="userTitle" style={{ width: "10%",height:"35px",display:"flex",alignItems:"center"  }}>Role</div>
          <div className="userTitle" style={{height:"35px" ,display:"flex",alignItems:"center" }}>Tables</div>
        </div>

        <div className="viewUser" style={{overflowY:"scroll",borderBottom:"1px solid #413E3E",height:"95%",paddingTop:"10px"}} >
        {userData.map((user) => {
          return (
            <>
                <div className="user" style={{color:"white"}}>
                  <div className="userDetail" style={{ width: "15%" }}>{user.username}</div>
                  <div className="userDetail" style={{ width: "23%" }}>
                    {user.email}
                  </div>
                  <div className="userDetail" style={{ width: "17%" }}>{user.password}</div>
                  <div className="userDetail" style={{ width: "10%" }}>{user.role}</div>
                  <div className="userDetail">{user.tables.map((table)=><span>{table},</span>)}</div>
                <div className="action" style={{ margin:"0 25px"}}>
                  <button style={{height: "35px",border: "1px solid black",backgroundColor:" #413E3E",borderRadius: "4px",color:"white" }} onClick={()=>{deleteUser(user.username,user.email)}}>delete</button>
                </div>
                </div>
            </>
          );
        })}

        </div>

        </div>

        <div className="todaysAllocation" style={{margin:"50px 0px",color:"whitesmoke",height:"38%",backgroundColor: "#1F1D2B"}}>
          <div className="title" style={{backgroundColor: "#1F1D2B" ,fontSize:"1.3rem"}}>
            Todays Allocation
          </div>
          <div className="userTitles" style={{backgroundColor: "#1F1D2B",height:"16%"}} >
            <div className="userTitle" style={{display:"flex",alignItems:"center"  }}>Waiter</div>
            <div className="userTitle"  style={{width:"40%",display:"flex",alignItems:"center" }}>Table</div>
          </div>
          {showAllocation ? (
          <div className="viewAllocation" style={{margin:"20px 0"}}>
            {UserAllocation.map((user)=>{
              return(
                <>
                  <div className="user" style={{backgroundColor: "#1F1D2B",height:"16%",padding:"5px 48px"}}>
                    <div className="userDetail" style={{display:"flex",alignItems:"center",height:"35px",borderRadius:"6px"  }}>{user.waiter}</div>
                    <div className="userDetail" style={{width:"40%",display:"flex",alignItems:"center",borderRadius:"6px" }}>{user.tables.map((table)=><span>{table},</span>)}</div>
                  </div>
                </>
              )
            })}
            
          </div>

          ): (<div style={{height:"100px",display:"flex",justifyContent:"center",alignItems:"center",width:"60%",backgroundColor: "#1F1D2B",padding: "10px 48px"}}> Attendance not done Yet</div>)}
        </div>
      </div>
  );
};

export default UserSection;
