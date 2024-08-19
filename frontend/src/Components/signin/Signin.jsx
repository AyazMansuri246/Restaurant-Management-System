import React, { useState } from "react";
import "../../styles/signin.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Success") {
          alert("login succesful");
          navigate("/home");
        } else {
          alert("Wrong credential");
          // navigate("/")
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
    <div className="loginCard">

      <form onSubmit={handleSubmit}>
        <input
          className="form-control loginInput"
          type="text"
          id="email"
          placeholder="Email ID"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          />
        <label for="email">Email ID</label>

        <input
          className="form-control pword loginInput"
          type="password"
          placeholder="Name"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label for="name">Password</label>

        <div className="">
          <input
            type="submit"
            value="submit"
            name="submit"
            className="submitBtn"
          />
        </div>
      </form>

      <p>already have an account?</p>
      <Link to="/">Sign Up</Link>
    </div>
    </>
  );
};

export default Signin;
