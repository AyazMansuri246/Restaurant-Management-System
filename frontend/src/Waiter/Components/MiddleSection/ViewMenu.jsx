import axios from "axios";
import React from "react";


const ViewMenu = (props) => {


  // const delItem = async(mainCategory,subCategory)=>{
  //   try{
  //     if(window.confirm("Are you Sure, you want to delete it ?")){
        
  //       const del = await axios.delete(`/home/menu?mainCategory=${mainCategory}&subCategory=${subCategory}`)
  //       console.log("deleted");
  //       props.getMenu();
  //     }
  //   }catch(e){
  //     console.log("error on deleting item, frontend side ",e);
  //   }
  // }

  const addItemInOrders = (itemName,itemPrice)=>{
    if(itemPrice===0)
      return;
    
    props.setOrders((preval)=>{
      let flag=0;
      for(let orderArray of preval){
        if(orderArray[0]==itemName && orderArray[2]==props.currTable){
          console.log("same")
          flag=1;
          break;
        }

      }
      if(flag){
        return preval;
      }
      return(
        [...preval,[itemName,itemPrice,props.currTable,1,""]]
      )
    })

  }

  return (
    <>
      <div className="oneCategory" style={{margin:"40px 0",backgroundColor: "#1F1D2B"}}>
        <div className="categoryTitleAndOther" style={{borderRadius:"5px",height:"30px",display:"flex",alignItems:"center"}} >
          <div className="mainCategory" style={{borderRadius:"5px"}}>{props.mainCategory}</div>
          <div className="qtyName" style={{ display: "flex" }}>
            <div
              style={{ padding: "0 15px", width: "50%", textAlign: "center" }}
            >
              Half
            </div>
            <div
              style={{ padding: "0 15px", width: "50%", textAlign: "center" }}
            >
              Full
            </div>
          </div>
        </div>
        {props.menu.map((oneItem) => {
            
            if(oneItem.mainCategory == props.mainCategory){
                return (
                  <>
                    <div className="categoryItems" style={{backgroundColor: "#1F1D2B"}}>
                      <div className="subCategory"  style={{backgroundColor: "#1F1D2B"}}>{oneItem.subCategory}</div>
                      <div className="qtyPrice" style={{ display: "flex" }}>
                        <button
                          style={{
                            padding: "0 15px",
                            width: "50%",
                            textAlign: "center",
                            backgroundColor: "#413E3E",
                            color:"white",
                            // border:"2px solid black",
                            border:"unset",
                            borderRadius:"5px",
                            height:"30px",
                            margin:"0px 4px"
                          }}

                          onClick={()=>{addItemInOrders(oneItem.subCategory,oneItem.halfPrice)}}
                        >
                          {oneItem.halfPrice}
                        </button>
                        <button
                          style={{
                            padding: "0 15px",
                            width: "50%",
                            textAlign: "center",
                            backgroundColor: "#413E3E",
                            color:"white",
                            border:"unset",
                            borderRadius:"5px",
                            height:"30px",
                            margin:"0px 5px"

                          }}
                          onClick={()=>{addItemInOrders(oneItem.subCategory,oneItem.fullPrice)}}
                        >
                          {oneItem.fullPrice}
                        </button>
                      </div>
                      {/* <div className="addItem">
                        <button style={{color:"white",width:"80px",border:"unset",border:"1px solid #413E3E",borderRadius:"5px",backgroundColor:" #413E3E",margin:"0px 10px"}}>Add</button>
                      </div> */}
                    </div>
                  </>
                );
            }
        })}
      </div>
    </>
  );
};

export default ViewMenu;
