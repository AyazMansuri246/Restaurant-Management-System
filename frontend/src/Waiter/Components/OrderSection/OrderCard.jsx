import React, { useEffect, useState } from 'react'

const OrderCard = (props) => {

  // const [orderQty,setOrderQty] = useState<number>(0)
  const [order,setOrder] = useState({
    orderQty:props.order[3],
    orderNote:props.order[4]
  })

  const [render,setRender] = useState(0);

  const inputHandler=(e)=>{
    // console.log("hii",e.target);

    const {value,name} = e.target;
    // console.log(name,value)
    setOrder((preval)=>{
      return{
        ...preval,
        [name]:value     /*[] important*/ 
      }
    })

    
    props.setOrders((preval)=>{
      console.log("preval is ",preval);
      for(let singleOrder of preval){
        if(singleOrder[2]==props.order[2] && singleOrder[0] == props.order[0]){
          singleOrder[4] = value;  
          console.log(singleOrder[4])
        }
      }
      return preval;
    })
    
    
  }

  const handleCounter = (a)=>{
    if(a=="i"){
      setOrder((preval)=>{
        return{
          ...preval,
          "orderQty": preval.orderQty+1
        }
      })

      props.setOrders((preval)=>{
        console.log("preval is ",preval);
        for(let singleOrder of preval){
          if(singleOrder[2]==props.order[2] && singleOrder[0] == props.order[0]){
            // console.log("increment in ",singleOrder[0],singleOrder[2])
            singleOrder[3] = order.orderQty+1;
            singleOrder[4] = order.orderNote;
            console.log("orderNote is ",order);
            
            
          }
        }
        return preval;
      })
    }
    else{
      setOrder((preval)=>{
        if(preval.orderQty==1){
          return {...preval}
        }
        return{
          ...preval,
          "orderQty": preval.orderQty-1
        }
      })
      if(order.orderQty>1){
      
        props.setOrders((preval)=>{
          // console.log("preval is ",preval);
          for(let singleOrder of preval){
            if(singleOrder[2]==props.order[2] && singleOrder[0] == props.order[0]){
              // console.log("decrement in ",singleOrder[0],singleOrder[2])
              singleOrder[3] = order.orderQty-1;  
            }
          }
          return preval;
        })
      }
    }
  }


  return (
    <div className='OrderCard' >
      <div className="firstLine">
        <div className="NameAndPrice"  >
          <div className="itemName" >
            {props.order[0]}
          </div>
          <div className="itemPrice">
            {props.order[1]}
          </div>
        </div>
        <div className="quantity" style={{display:"flex"}} >
          <button style={{width: "20px",height: "27px",fontSize: "1.5rem",display:"flex",justifyContent:"center",alignItems:"center"}} onClick={()=>{handleCounter("i")}}>+</button> 
          <input type="number" style={{width:"25px", backgroundColor:"#2D303E", height:"30px", borderRadius:"3px",margin:"0 5px",color:"white"}} name='orderQty' onChange={inputHandler} value={order.orderQty}/>  
          <button style={{width: "20px",height: "27px",fontSize: "1.4rem",display:"flex",justifyContent:"center",alignItems:"center"}} onClick={()=>{handleCounter("d")}}>-</button>
        </div>
        <div className="totalPrice">
          {props.order[1]*order.orderQty}
        </div>
      </div>

      <div className="secondLine">
        <div className="itemNote">
          <input type="text" placeholder='Order Note..' value={order.orderNote} name='orderNote' onChange={inputHandler}/>
        </div>
        <div className="delOrder">
          <button onClick={()=>{props.delOrder(props.order[2],props.order[0])}}>Del</button>
        </div>
      </div>
    </div>
  )
}

export default OrderCard;
