import React, { useState } from 'react'
import { useLocation } from 'react-router-dom';
import '../../Styles/MainPage.css'
import TableQueue from '../FirstSection/TableQueue'
import OrderCard from '../OrderSection/OrderCard'
import MenuSection from '../MiddleSection/MenuSection'
import TotalOrders from '../OrderSection/TotalOrders';
import axios from 'axios';

const MainPage = () => {
  const d = new Date();
  const location=useLocation();
  
  const [currTable,setCurrTable]= useState("");
  const tables = location.state.tables;
  const [orders,setOrders] = useState([]);
  const [totalOrders,setTotalOrders] = useState([]);


  console.log("the table is ",tables);
  console.log("the orders are ",orders)
  console.log("total orders are ",totalOrders)



  const delOrder = (table,orderName)=>{
    console.log(table,orderName);
    setOrders((preval)=>{
      
      return preval.filter((order)=>!(order[2]==table&&order[0]==orderName))
      
    })
  }


  const AddOrder = async()=>{

    try{

      let date = new Date().toLocaleDateString("en-GB");
      if(orders){
        console.log("orders are ");
        
        
        for(const order of orders){
          if(order[2]==currTable){
            console.log(order)
            const res = await axios.post("/waiter/order",{date,tableName:order[2],itemName:order[0],itemPrice:order[1],itemQty:order[3],itemNote:order[4]})
            console.log(res.data);
  
            setTotalOrders((preval)=>{
              let flag=0;
              for(let totalOrder of totalOrders){
                if(totalOrder[2]==order[2] && totalOrder[0]==order[0] && totalOrder[1]==order[1]){
                  flag=1;
                  totalOrder[3]+=order[3];
                  console.log(totalOrders)
                  break;
                }
              }
              if(flag){
                return [...preval]
              }
              else{
                return(
                  [...preval,order]
                )
              }
            })
  
            setOrders((preval)=>{
        
              return preval.filter((allOrder)=>(allOrder!=order))
              
            })
          }
        }
      }
    }catch(e){
      console.log("error on saving orders frontend side ",e);
    }
  }


  const currentTable = (table)=>{
    setCurrTable(table);
  }

  return (
    <div className='MainPage'>
      <div className="tableSection">
        <TableQueue currentTable={currentTable} tables={tables}/>
        {/* <div className="otherSection">
            <div className="status">
                OrderSection : Pending
            </div>
            <div className="occupied">
                Occpied: 
                <button style={{width:"50px", height:"40px", fontSize:"20px"}}>Yes</button>
                <button style={{width:"50px", height:"40px", fontSize:"20px"}}>No</button>
            </div>
        </div> */}
      </div>
      <div className="menuSectionContent">
        <div className="upperContent">
          <div className="name" style={{fontFamily:"sans-serif",fontSize:"1.9rem"}}>Restuarant Manager</div>
          <div className="date" style={{color:"#F8F8F8"}}>{d.toDateString()}</div>
          {/* <div className="searchBar" >
            <input type="text" placeholder='Search Item' />
          </div> */}
        </div>
        
        {/* <div style={{padding: "20px 0px" , display:"inline-block" , width:"80%",fontSize:"1.4rem",fontWeight:"500"}}>Choose Dishes</div> */}
        
        <hr />
        {currTable &&
          <MenuSection setOrders={setOrders} currTable={currTable}/>
        }


      </div>


      {/* Order section */ }

      <div className="orderSection" style={{padding:"15px 10px"}}>
        <div className="orderId" style={{padding:"0px 0"}}>
          Order :  #34534
        </div> 
        <div className="titlecontent" style={{padding:"10px 0"}} >
          <div className="itemTitle" style={{display:"inline-block", width:"221px", border:"0px solid"}}>Item</div>
          <div className="qtyTitle" style={{display:"inline-block" , width:"70px",border:"0px solid"}}>Qty</div>
          <div className="priceTitle" style={{display:"inline-block",width:"75px",border:"0px solid"}}>Price</div>
        </div>
        <hr />
        <div className="orders">
          {orders.map((order)=>{
            if(currTable===order[2]){
              return(
                <OrderCard order={order} delOrder={delOrder} setOrders={setOrders} />
              )
            }
          })}
        </div>
        <hr />
        <div style={{display:"flex",justifyContent:"center",border:"0px solid red"}}>
        <button style={{margin:"0px 0",backgroundColor:"#EA7C69",border:"unset" ,borderRadius:"5px",height:"35px",color:"white"}} onClick={AddOrder}>Place Order</button>
        </div>

        <TotalOrders totalOrders={totalOrders} setTotalOrders={setTotalOrders} currTable={currTable}/>
  
        

      </div>

    </div>
  )
}

export default MainPage
