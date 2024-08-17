import React, { useEffect, useState } from "react";
import "../../styles/User.css";
import axios from "axios";

const UserSection = () => {
  const [showOption, setOption] = useState(false);
  const [userData,setUserData] = useState([]);
  const [table,setTable] = useState([]);
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
      console.log(tableData.data);
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

  useEffect(() => {
    getUsers();
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
              height: "30px",
              width:"200px",
              borderRadius: "4px",
              border: "1px solid black",
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
              height: "30px",
              width:"250px",
              borderRadius: "4px",
              border: "1px solid black",
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
              height: "30px",
              width:"200px",
              borderRadius: "4px",
              border: "1px solid black",
            }}
          />
        </div>
        <div className="userField">
          <select
            name="role"
            id=""
            onChange={inputHandler}
            style={{ height: "30px", borderRadius: "4px",margin:"5px 0",color:"white"}}
          >
            <option value="Role">Role</option>
            <option value="admin">Admin</option>
            <option value="waiter">Waiter</option>
            <option value="chef">Chef</option>
          </select>
        </div>

        <div className="userField selectTables" style={{margin:"5px 0"}}>
          <div
            name="tables"
            id=""
            style={{
              width: "200px",
              border: "1px solid black",
              height: "30px",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "1.12rem",
              color:"white"
              
            }}
          >
            {/* <option value="sv">select value</option> */}
            select Table
            <button
              onClick={() => {
                if (showOption == true) {
                  setOption(false);
                } else {
                  setOption(true);
                }
              }}
              style={{ all: "unset", backgroundColor: "#eeeeee",color:"black" }}
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
                    width: "185px",
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "2px 10px",
                    borderRadius: "3px",
                    // backgroundColor: "white",
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
                      width: "185px",
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
        
      <div className="userLogData" style={{height:"40%"}}>
        <div className="userTitles" style={{color:"white",height:"14%"}}>
          <div className="userTitle" style={{ width: "15%",height:"35px",display:"flex",alignItems:"center" }}>UserName</div>
          <div className="userTitle" style={{ width: "23%",height:"35px",display:"flex",alignItems:"center"  }}>
            Email
          </div>
          <div className="userTitle" style={{ width: "17%",height:"35px",display:"flex",alignItems:"center"  }}>Password</div>
          <div className="userTitle" style={{ width: "10%",height:"35px",display:"flex",alignItems:"center"  }}>Role</div>
          <div className="userTitle" style={{height:"35px" ,display:"flex",alignItems:"center" }}>Tables</div>
        </div>

        <div className="viewUser" style={{overflowY:"scroll",borderBottom:"1px solid #413E3E",height:"95%",backgroundColor: "#1F1D2B",paddingTop:"10px"}} >
        {userData.map((user) => {
          return (
            <>
                <div className="user" style={{backgroundColor: "#1F1D2B",color:"white"}}>
                  <div className="userDetail" style={{ width: "15%" }}>{user.username}</div>
                  <div className="userDetail" style={{ width: "23%" }}>
                    {user.email}
                  </div>
                  <div className="userDetail" style={{ width: "17%" }}>{user.password}</div>
                  <div className="userDetail" style={{ width: "10%" }}>{user.role}</div>
                  <div className="userDetail">{user.tables.map((table)=><span>{table},</span>)}</div>
                <div className="action" style={{ margin:"0 25px"}}>
                  <button style={{height: "30px",border: "1px solid black",backgroundColor:"transparent",borderRadius: "4px",color:"white" }} onClick={()=>{deleteUser(user.username,user.email)}}>delete</button>
                </div>
                </div>
            </>
          );
        })}

        </div>

        </div>

        <div className="todaysAllocation">
          allocation
        </div>


      </div>
  );
};

export default UserSection;
