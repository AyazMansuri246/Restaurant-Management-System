import React, { useEffect,useState } from 'react'
import axios from 'axios';
import '../../styles/Log.css'
import img1 from '../../Images/img1.png';

import {Bar} from "react-chartjs-2";
import{
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)


const Log = () => {

  const d = new Date();
  const todaysDate = d.toLocaleDateString("en-GB");
  const [LogData,setLogData] = useState([]);
  // const [Revenue,setRevenue] = useState({
  //   today : 0,
  //   yesterday : 0
  // })

  const [revenueArr,setRevenueArr] = useState();
  const [days,setDays] = useState();
  const [ordersCnt , setOrdersCnt] = useState();

  const getTodaysOrder = async()=>{
    try{
      const res = await axios.get("/home/log");
      console.log(res.data);
      if(res.data != null){
        setLogData(res.data[0]);
        // setRevenue({
        //   today : res.data[1],
        //   yesterday : res.data[2]
        // })
        setRevenueArr(res.data[1].reverse())
        setDays(res.data[2].reverse())
        setOrdersCnt(res.data[3].reverse());
        
      }
    }
    catch(e){
      console.log("Error on fetching log on frontend side")
    }
  }
  console.log("This is log data",LogData)

  useEffect(()=>{
    getTodaysOrder();
  },[])

  const options = {
    scales: {
      x: {
        ticks: {
          color: 'white', // Change x-axis tick color
        },
      },
      y: {
        ticks: {
          color: 'white', // Change y-axis tick color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: '#EA7C69', // Change legend text color
        },
      },
    
    },
  };

  const options2 = {
    scales: {
      x: {
        ticks: {
          color: 'white', // Change x-axis tick color
        },
      },
      y: {
        ticks: {
          color: 'white', // Change y-axis tick color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'orange', // Change legend text color
        },
      },
    
    },
  };


  const RevenueChart = {
    labels:days,
    datasets: [
      {
        label:"Revenue",
        data:revenueArr,
        backgroundColor:"#669999",
        borderColor:"white",
        borderWidth:.5,
      }
    ]
  };
  const OrderCntChart = {
    labels:days,
    datasets: [
      {
        label:"Orders",
        data:ordersCnt,
        backgroundColor:"#94A684",
        borderColor:"white",
        borderWidth:.5,
      }
    ]
  };
  


  
  
  return (
    <>
    
      <div className="todaysLogDetails" style={{}}>
        {todaysDate}

        


        <div className="menuItemsSaleToday">
          <div className="rowTitle">
            <div className="rTitle" style={{width:"20%"}}>Table</div>
            <div className="rTitle" style={{width:"40%"}}>Orders</div>
            <div className="rTitle" style={{width:"20%"}}>Total Amount</div>
            <div className="rTitle" style={{width:"20%", borderRight: "0px"}}>finish time</div>
          </div>

          
          
          <div className="TodaysLogData">
          {LogData.map((log)=>{
            return(
              <>
                <div className="viewLogData">
                  <div className="singlelogData" style={{width:"20%"}}>{log.table}</div>
                  <div className="singlelogData ordersDetails" style={{width:"40%"}}>{log.orders.map((singleOrder)=>{return(<> {singleOrder[0]},</>)})}</div>
                  <div className="singlelogData" style={{width:"20%"}}>{log.total}</div>
                  <div className="singlelogData" style={{width:"20%"}}>{log.finishTime}</div>
                </div>

              </>
            )
          })}
          </div>

        </div>

        <div style={{display:"flex"}}>

        <div className="graphs" style={{width:"100%",border:"0px solid",height:"280px",display:"flex"}}>
          <div className="revenueGraph" style={{border:"1px solid #343030",width:"60%",boxShadow:"0px 0px 2px 1px",backgroundColor:"#343030",margin:"0px 10px"}}>
            <Bar options={options} data={RevenueChart}/> 
          </div>
          <div className="orderGraph" style={{border:"1px solid #343030",width:"60%",boxShadow:"0px 0px 2px 1px",backgroundColor:"#343030"}}>
          <Bar options={options2} data={OrderCntChart}/>
          </div>
        </div>
        {/* <div className="revenueBoxes">
          <div className="revenue box">
            <div style={{display:"flex"}}>
              <div className="revenueImg">
                <img src={img1} alt="image" />
              </div>
              <div className="value">
              Today Sales : {Revenue.today}
              Yesterday Sales : {Revenue.yesterday}

              </div>
            </div>
            
          </div>
        </div> */}

        </div>

        

        
      </div>
    
    </>
  )
}

export default Log
