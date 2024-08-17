import React from 'react'
import "../../styles/Home.css"
import TableSection from '../RightSection/TableSection'
import { Link,Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="profileSection">
        <div className="restoName">Restaurant Name</div>
        <div className="profileName">
          <button>Profile</button>
        </div>
      </div>
      <div className="detailSection">
        <div className="leftSection">
          <Link to="/home/table">
            <button>Table</button>
          </Link>
          <Link to="/home/menu">
            <button>Menu</button>
          </Link>
          <Link to="/home/user">
            <button>User</button>
          </Link>
          <Link to="/home/log">
            <button>Todays Log</button>
          </Link>
          <Link to="/home/attendance">
            <button>Attendance</button>
          </Link>

        </div>
        <div className="rightSection">
          <div className="differentSection">
          <Outlet/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
