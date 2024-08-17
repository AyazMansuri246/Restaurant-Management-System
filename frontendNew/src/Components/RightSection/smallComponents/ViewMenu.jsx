import axios from "axios";
import React from "react";


const ViewMenu = (props) => {


  const delItem = async(mainCategory,subCategory)=>{
    try{
      if(window.confirm("Are you Sure, you want to delete it ?")){
        
        const del = await axios.delete(`/home/menu?mainCategory=${mainCategory}&subCategory=${subCategory}`)
        console.log("deleted");
        props.getMenu();
      }
    }catch(e){
      console.log("error on deleting item, frontend side ",e);
    }
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
                        <div
                          style={{
                            padding: "0 15px",
                            width: "50%",
                            textAlign: "center",
                            backgroundColor: "#1F1D2B"
                          }}
                        >
                          {oneItem.halfPrice}
                        </div>
                        <div
                          style={{
                            padding: "0 15px",
                            width: "50%",
                            textAlign: "center",
                            backgroundColor: "#1F1D2B"
                          }}
                        >
                          {oneItem.fullPrice}
                        </div>
                      </div>
                      <div className="delItem">
                        <button style={{color:"white",width:"80px",border:"unset",border:"1px solid #413E3E",borderRadius:"5px"}} onClick={()=>{delItem(oneItem.mainCategory,oneItem.subCategory)}}>Delete</button>
                      </div>
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
