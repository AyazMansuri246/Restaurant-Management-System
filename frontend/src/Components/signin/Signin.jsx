import React,{useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Signin = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
      e.preventDefault()
      axios.post("/login", { email, password })
      .then(result => {
          console.log(result)
          if(result.data === "Success"){
            alert("login succesful")
              navigate("/home")
          }else{
            alert("Wrong credential")
              // navigate("/")
          }
      })
      .catch(err => console.log(err))
    }

  return (
    <>
    <div className="container mt-5 mb-5 justify-content-center col-md-4" >
      <div className="card px-3 py-4">
        <div className="card-body">

      <form onSubmit={handleSubmit}>

        {/* <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" name="pword" onChange={(e)=>setPassword(e.target.value)} />

            <button type="submit">SignUp</button> */}

            <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="form-group form-floating">
                                <input className="form-control" type="text" id="email" placeholder="Email ID" name="email" 
                                  onChange={(e)=>setEmail(e.target.value)}  />
                                <label for="email">Email ID</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 mb-3">
                            <div className="form-group form-floating">
                                <input className="form-control pword" type="password" placeholder="Name" name="password" 
                                  onChange={(e)=>setPassword(e.target.value)}  />
                                <label for="name">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <input type="submit" value="submit" name="submit" className="submitBtn"/>
                    </div>
        </form>
        </div>
        <p>already have an account?</p>
        <Link to="/">Sign Up</Link>
      </div>
    </div>


    </>
  )
}

export default Signin
