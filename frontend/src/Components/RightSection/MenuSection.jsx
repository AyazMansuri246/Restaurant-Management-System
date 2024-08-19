import React, { useEffect, useState } from 'react'
import "../../styles/MenuSection.css"
import axios from 'axios';
import ViewMenu from './smallComponents/ViewMenu';

const MenuSection = () => {


  const [menuDetails,setMenuDetails] = useState({
    mainCategory:"",
    subCategory:"",
    halfPrice:0,
    fullPrice:0
  })

  const [menu,setMenu] = useState([]);
  const [mainCategory,setMainCategory] = useState([]); //array of string

  function inputHandler(e){
    const {value,name} = e.target;
    setMenuDetails((preval)=>{
        return (
            {
                ...preval,
                [name] : value
            }
        )
    })
}


  const addingMenu = async(e)=>{
    try{
      e.preventDefault();
      // console.log(menuDetails)
      const res = await axios.post("/home/menu",menuDetails);
      if(res){
        // console.log(res.data)
        getMenu()
        setMenuDetails({
          mainCategory:"",
          subCategory:"",
          halfPrice:0,
          fullPrice:0
        })

        // alert(res.data);
      }
    }
    catch(e){
      console.log("error in getting res when adding menu ",e);
    }
  }

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
    <div className="menuSection" >
      <div style={{padding:"10px",fontSize:"1.3rem",backgroundColor: "#1F1D2B",color:"white"}}>
        Product Management
      </div>
      {/* <div className="dishesLink">
        <div className="links"><Link>Hot Dishes</Link></div>  
        <div className="links"><Link>Cold Dishes</Link></div>  
      </div> */}
      <div className="menuTable" style={{backgroundColor: "#1F1D2B"}}>

        <div className="addingMenu" >
          <form action="" onSubmit={addingMenu} style={{backgroundColor: "#1F1D2B",color:"white"}}>
            <input type="text" placeholder='Main Category' name='mainCategory' value={menuDetails.mainCategory} onChange={inputHandler} required />
            <input type="text" placeholder='Sub Category' name='subCategory' value={menuDetails.subCategory} onChange={inputHandler} required/>
            <input type="number" placeholder='Half Qty Price' name="halfPrice" value={menuDetails.halfPrice} onChange={inputHandler} required />
            <input type="number" placeholder='Full Qty Price' name="fullPrice" value={menuDetails.fullPrice} onChange={inputHandler} required />
            <button style={{backgroundColor: "#413E3E",color:'white',border:"1px solid black",height:"35px",borderRadius:"5px",width:"80px"}}>Submit</button>
          </form>
        </div>

        <div className="viewMenu"  style={{backgroundColor: "#1F1D2B"}}>
            {mainCategory.map((oneCat)=>{
              // console.log("this is oneCAt ",oneCat)
              return(
                <ViewMenu menu={menu} mainCategory={oneCat} getMenu={getMenu}/>
              )
            })}

          {/* <div className="oneCategory">
            <div className="categoryTitleAndOther">
              <div className="mainCategory">
                Roti
              </div>
              <div className="qtyName" style={{display:"flex"}}>
                <div style={{margin:"0 15px",width:"50%",textAlign:"center"}}>Half</div>
                <div style={{margin:"0 15px",width:"50%",textAlign:"center" }}>Full</div>
              </div>
            </div>
            <div className="categoryItems">
              <div className="subCategory">
                Rumali Roti
              </div>
              <div className="qtyPrice" style={{display:"flex"}}>
                <div style={{margin:"0 15px" ,width:"50%",textAlign:"center"}}>-</div>
                <div style={{margin:"0 15px" ,width:"50%",textAlign:"center"}}>100Rs</div>
              </div>
            </div>
            <div className="categoryItems" >
              <div className="subCategory">
                Tandoori Roti
              </div>
              <div className="qtyPrice" style={{display:"flex"}}>
                <div style={{margin:"0 15px" ,width:"50%",textAlign:"center"}}>-</div>
                <div style={{margin:"0 15px" ,width:"50%",textAlign:"center"}}>20Rs</div>
              </div>
            </div>
            <div className="categoryItems">
              <div className="subCategory">
                Tandoori Naan
              </div>
              <div className="qtyPrice" style={{display:"flex"}}>
                <div style={{margin:"0 15px" ,width:"50%",textAlign:"center"}}>-</div>
                <div style={{margin:"0 15px" ,width:"50%",textAlign:"center"}}>25Rs</div>
              </div>
            </div>
          </div> */}
        </div>

      </div>
    </div>
    </>
  )
}

export default MenuSection
