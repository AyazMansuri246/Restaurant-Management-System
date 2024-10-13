import axios from "axios";
import React from "react";

const TotalOrdersCard = (props) => {
  const { order } = props;

  return (
    <div style={{ display: "flex", padding: "10px 4px" }}>
      <div className="nameAndPrice" style={{ width: "50%" }}>
        <div className="name">{order[0]}</div>
        <div className="price">{order[1]}</div>
      </div>
      <div className="qty" style={{ width: "30%", border: "0px solid red" }}>
        {order[3]}
      </div>
      <div className="total" style={{ width: "20%", border: "0px solid red" }}>
        {order[1] * order[3]}
      </div>
    </div>
  );
};


const TotalOrders = (props) => {
  const { totalOrders,setTotalOrders, currTable } = props;

  let total = 0;
  const totalValue = ()=>{
    totalOrders.forEach((order)=>{
      if(order[2] == currTable){
        total+=(order[1]*order[3]);
      }
    })
  }
  totalValue();

  let date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();
  let time = `${hour}:${min}`;

  console.log("total are",totalOrders);
  
  
  const finalAdd = async()=>{
    try{
      let singleTableOrders = []
      for(let order of totalOrders){
        if(order[2]==currTable){
          singleTableOrders.push(order);
        }
      }
      // console.log("orders are",singleTableOrders)
      if(singleTableOrders.length!=0){
        const d = new Date();
        let currentDate = d.toLocaleDateString("en-GB");
        const res = await axios.post("/waiter/log",{date:currentDate,table:currTable,orders:singleTableOrders,total:total,finishTime:time})
        console.log(res.data);
        if(res.data == "Log Added"){
          for(let order of totalOrders){
            if(order[2]==currTable){
              setTotalOrders((preval)=>{
                return(
                  preval.filter((tOrder)=>tOrder!=order)
                )
              })
            }
          }
        }
      }
      

    }catch(e){
      console.log("error on saving log frontend side",e);
    }
  }

  return (
    <>
    <div
      className="TotalOrders"
      style={{
        height: "30%",
        border: "0px solid white",
        overflowY: "scroll",
        margin: "10px 0",
      }}
    >
      {/* <div className="titles" style={{display:"flex",padding:"10px 4px"}}>
        <div className="Item" style={{width:"50%"}}>Item</div>
        <div className="qty" style={{width:"30%"}}>Qty</div>
        <div className="total">Total</div>
      </div> */}
      {totalOrders.map((order) => {
        if (order[2] == currTable) {
          return (
            <>
              <TotalOrdersCard order={order} />
            </>
          );
        }
      })}
    </div>
    <hr />
      {totalOrders && (
        <div
        className="allDoneBtn"
        style={{ display: "flex", justifyContent: "end",margin:"20px 40px" }}
        >
        <button
          style={{
            margin: "0px 20px",
            backgroundColor: "#EA7C69",
            border: "unset",
            borderRadius: "5px",
            height: "35px",
            color: "white",
          }}
          onClick={finalAdd}
        >
          All Done
        </button>
        
        <div className="total" style={{display:"flex",border:"0px solid red",width:"30%"}}>
          <div style={{width:"50%"}}>Total :</div>
          <div className="totalValue"  >{total}</div>
        </div>
      </div>)}
      
  </>
  );
};

export default TotalOrders;
