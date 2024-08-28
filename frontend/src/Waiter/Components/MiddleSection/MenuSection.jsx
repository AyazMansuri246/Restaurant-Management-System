import React, { useEffect, useState } from 'react'
import "../../Styles/MenuSection.css"
import axios from 'axios';
import ViewMenu from './ViewMenu';

const MenuSection = (props) => {


  const [menuDetails,setMenuDetails] = useState({
    mainCategory:"",
    subCategory:"",
    halfPrice:0,
    fullPrice:0
  })

  const [menu,setMenu] = useState([]);
  const [mainCategory,setMainCategory] = useState([]); //array of string

  
  const getMenu = async()=>{
    try{
      const res =await axios.get("/home/menu");
      // console.log(res.data);
      // console.log("inside getMenu");
      setMenu(res.data)
      // console.log("menu is ",menu) //it comes empty as code works asyncronously so this execute first maybe
    }catch(e){
      console.log("Error on frontend side ",e);
    }
  }

  const getMainCategories = ()=>{
    
      // console.log("hi inside getMainCategories")
      menu.forEach((singleobj)=>{
        setMainCategory((preval)=>{
            return(
              [...preval,singleobj.mainCategory]
            )
          
        });
      })

      setMainCategory((preval)=> [...new Set(preval)]);
    
  }


  useEffect(()=>{
    getMenu();
  },[])

  useEffect(()=>{
    getMainCategories();    
  },[menu])

  // console.log("menu is",menu) 
  // console.log("Main cat is ",mainCategory);

  return (
    <>
    <div className="menuSection" style={{width:"100%",border:"0px solid black"}}>
      
      <div className="menuTable" style={{backgroundColor: "#1F1D2B"}}>


        <div className="viewMenu"  style={{backgroundColor: "#1F1D2B"}}>
            {mainCategory.map((oneCat)=>{
              return(
                <ViewMenu menu={menu} mainCategory={oneCat} getMenu={getMenu} setOrders={props.setOrders} currTable={props.currTable}/>
              )
            })}
        </div>

      </div>
    </div>
    </>
  )
}

export default MenuSection
