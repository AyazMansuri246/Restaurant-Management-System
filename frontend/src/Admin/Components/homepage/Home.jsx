import React,{useState} from 'react'
import "../../styles/Home.css"
import TableSection from '../RightSection/TableSection'
import { Link,Outlet } from "react-router-dom";

const Home = () => {
  const [active, setActive] = useState();
  return (
    <>
      <div className="profileSection">
        <div className="restoName">Resto Manager</div>
        {/* <div className="profileName">
          <button>Profile</button>
        </div> */}
      </div>
      <div className="detailSection">
        <div className="leftSection">
          <Link to="/home/table" >
            <button className={`buttonPrimary1 ${active === "table" ? 'activeLink' : ''}`} onClick={()=>{setActive("table")}}>Table</button>
          </Link>
          <Link to="/home/menu">
            <button className={`buttonPrimary1 ${active === "menu" ? 'activeLink' : ''}`} onClick={()=>{setActive("menu")}}>Menu</button>
          </Link>
          <Link to="/home/user">
            <button className={`buttonPrimary1 ${active === "user" ? 'activeLink' : ''}`} onClick={()=>{setActive("user")}}>User</button>
          </Link>
          <Link to="/home/log">
            <button className={`buttonPrimary1 ${active === "log" ? 'activeLink' : ''}`} onClick={()=>{setActive("log")}}>Todays Log</button>
          </Link>
          <Link to="/home/attendance">
            <button className={`buttonPrimary1 ${active === "attendee" ? 'activeLink' : ''}`} onClick={()=>{setActive("attendee")}}>Attendance</button>
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
