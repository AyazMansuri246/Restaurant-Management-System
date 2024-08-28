import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  // const [userName, setUserName] = useState();
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [cpassword, setCPassword] = useState();

  const [user,setUser] = useState({
    userName : "",
    email : "",
    password :"",
    cpassword : ""
  })

  const navigate = useNavigate();


  function inputHandler(e){
    const {value,name} = e.target;
    setUser((preval)=>{
      return(
        {
          ...preval,
          [name]:value
        }
      )
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(user.password===user.cpassword){
        const response = await axios.post("/register", {
          username : user.userName,
          email : user.email,
          password : user.password
        });

        // console.log("done");
        setUser({
          userName: "",
          email:"",
          password:"",
          cpassword:""
        })

        alert("Registration successful");

        navigate("/login")
      }
      else{
        alert("Enter same password")
      }
    } catch (e) {
      console.log("Error is", e);
    }
  };

  return (
    <>
      {/* <form action="" onSubmit={handleSubmit}>
                <input type="text" name="name" onChange={(e)=>setName(e.target.value)} />
                <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" name="pword" onChange={(e)=>setPassword(e.target.value)} />

                <button type="submit">SignUp</button>
            </form> */}
        {/* <div className="container-fluid width">

      <form>
        <div className="form-group">
          <label for="name">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      </div> */}

      <div className="container mt-5 mb-5 col-md-4 justify-content-center ">
        <div className="card px-1 py-4 " >
            <div className="card-body">
                <form onSubmit={handleSubmit}> 
                    <h3 className="card-title mb-3 d-flex justify-content-center">Register</h3>

                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="form-group form-floating d-flex">
                                <input className="form-control" type="text" id="name" placeholder="Name" name="userName" value={user.userName}
                                  onChange={inputHandler}  />
                                <label for="name">UserName</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="form-group form-floating">
                                <input className="form-control" type="text" id="email" placeholder="Email ID" name="email" value={user.email}
                                  onChange={inputHandler}  />
                                <label for="email">Email ID</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="form-group form-floating">
                                <input className="form-control pword" type="password" placeholder="Name" name="password" value={user.password}
                                  onChange={inputHandler}  />
                                <label for="name">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="form-group form-floating">
                                <input className="form-control cpword" type="password" placeholder="Name" name="cpassword" value={user.cpassword}
                                   onChange={inputHandler} />
                                <label for="name">Confirm Password</label>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center">
                        <input type="submit" value="submit" name="submit" className="submitBtn"/>
                    </div>
                </form>

                <p>already have an account?</p>
                <Link to="/login">Login</Link>
            </div>
        </div>
    </div>

    </>
  );
}

export default Signup;
