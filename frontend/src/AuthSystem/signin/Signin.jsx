import React, { useState } from "react";
import "../styles/signin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try{

      e.preventDefault();
      const result = await axios.post("/login", { username, password })
      console.log(result.data)
      if (result.data[0] !== "No User") {
        if(result.data == "Wrong Password"){
          alert("Wrong Password");
        }
        if(result.data[0] == "admin"){
          alert("login succesful");
          navigate("/home");
        }
        if(result.data[0] == "waiter"){
          alert("login succesful");

          navigate("/waiter", {state : {tables:result.data[1]}});
        }
      } else {
          alert("Wrong credential");
      }
      
       
    }catch(e){
      console.log("Error on login frontend side",e);
    }
  };

  return (
    <div className="signIn">
      <div className="loginTitle">Login</div>
    <div className="loginCard">

      <form onSubmit={handleSubmit}>

        <div className="oneField">

        <input
          className="form-control loginInput"
          type="text"
          placeholder="UserName"
          name="email"
          onChange={(e) => setUsername(e.target.value)}
          />
        <label for="email">UserName</label>
        </div>

        <div className="oneField">


        <input
          className="form-control pword loginInput"
          type="password"
          placeholder="Name"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          />
        <label for="name">Password</label>
        </div>

        <div className="btnsSign">
          <input
            type="submit"
            value="submit"
            name="submit"
            className="submitBtn"
          />
        </div>
      </form>

      {/* <p>already have an account?</p>
      <Link to="/">Sign Up</Link> */}
    </div>
    </div>
  );
};

export default Signin;
