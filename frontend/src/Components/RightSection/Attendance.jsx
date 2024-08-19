import React, { useEffect , useState,useRef} from 'react'
import '../../styles/Attendance.css'
import axios from 'axios';

const Attendance = () => {

    const [waiter,setWaiter] = useState([]);
    const [tempWaiter,setTempWaiter] = useState([]);
    const [waiterAttendance,setWaiterAttendance] = useState([]);
    const [attendanceDone, setAttendanceDone] = useState(false);
    let logDate = "";

    const getWaiter = async()=>{
        try{
            const res = await axios.get("/home/attendance/waiter");
            // console.log(res.data);
            setWaiter(res.data);
            setTempWaiter(res.data);
        }catch(e){
            console.log("Error on fetching waiter frontend side ",e);
        }
        

    }
    

    const attendee = async(waiter,attendance)=>{
        try{
            const d = new Date();
            let currentDate = d.toLocaleDateString('en-GB');
            const res = await axios.post("/home/attendance", {waiter,attendance,currentDate});
            isAttendanceDone();
            getAttendance();
        }catch(e){
            console.log("error on adding attendence frontend side ",e);
        }
    }

    const getAttendance = async()=>{
        try{
            if(waiter.length<=1){                        // very important as at last only length would be one before last render 

                const res = await axios.get("/home/attendance");
                console.log("this is attendance and done",res.data);
                setWaiterAttendance(res.data);
                // console.log(waiterAttendance)
            }else{
                console.log("inside else in getAttendance")
            }
            
        }catch(e){
            console.log("error on fetching attendance data frontend side",e);
        }
    }
    

    const isAttendanceDone = async()=>{
        try{
            const getBool = await axios.get("/home/attendance/bool");
            if(getBool.data == ""){
                setAttendanceDone(false);
            }
            else{
                if(tempWaiter.length == getBool.data.length){
                    setAttendanceDone(true);
                }
                else{
                    getBool.data.forEach(element => {
                        setWaiter((preval)=>{
                            const newWaiter = preval.filter((singleWaiter)=>singleWaiter.username!=element);
                            return newWaiter;
                        })
                    });
                }
            }
        }catch(e){
            console.log("error");
        }
    }
       
    useEffect(()=>{
        getWaiter();
        getAttendance();
        isAttendanceDone();
    },[])

  return (
    <div style={{height:"80vh",color:"white"}}>
        <div className="heading" style={{ padding: "10px", fontSize: "1.3rem",backgroundColor: "#1F1D2B" }}>Attendance</div>
        <div className="allRows" style={{padding:"20px 0",height:"50%",border:"0px solid black",overflowY:"scroll"}}>

        {
        !attendanceDone ? (
        waiter.length>0 ? 
        
        (    waiter.map((oneWaiter)=>{
                return(
                    <>
                        <div className="waiterRow" style={{padding:"10 30px",height:"40px",margin:"15px 0",borderRadius:"5px",backgroundColor: "#413E3E"}}>
                            <div className="waiterName" style={{width:"50%"}}>{oneWaiter.username}</div>
                            <div className="waiterAttendance" >
                                <button style={{ color:"white"}} className='btn1' name='present' 
                                onClick={()=>{attendee(oneWaiter.username,"Present")}}
                                >Present</button>
                                <button style={{ color:"white"}} className='btn1' name='absent' 
                                onClick={()=>{attendee(oneWaiter.username,"Absent")}}
                                >Absent</button>
                            </div>
                            
                        </div>

                    </>
                )

            })) : <div style={{height:"100px",display:'flex',justifyContent:"center",alignItems:"center"}}>Attendance done</div>
        ) :  <div style={{height:"100px",display:'flex',justifyContent:"center",alignItems:"center"}}>Attendance done</div>
        }
        </div>

        <div className="attendanceLog">
            <div className="logTableTitle">
                <div className="date oneTitle" >Date</div>
                {tempWaiter.map((waiter)=>{return (<div className="waiter oneTitle">{waiter.username}</div>)})}
            </div>
            
            <div className="logData">

                {
                waiterAttendance.map((dateAttendance)=>{
                    if(dateAttendance.currentDate != logDate){
                        logDate = dateAttendance.currentDate;
                        return (<div className='logTableData'>
                            <div className="tableDate">{logDate}</div>
                            {
                                tempWaiter.map((waiter)=>{ 
                                    return waiterAttendance.map((arr)=>{
                                        if( arr.waiter==waiter.username && arr.currentDate==logDate){
                                            // console.log("this is waiters attendance ",arr.waiter)
                                            return(
                                                <>
                                                <div className="waiterData oneData">{arr.attendance} </div>
                                                </>
                                            )
                                        }
                                    })
                                })
                            }
                            </div>
                        )
                    }
                    // else{
                    //     return (<div>
                    //         {
                    //             tempWaiter.map((waiter)=>{ 
                    //                 return waiterAttendance.map((arr)=>{
                    //                     if( arr.waiter==waiter.username && arr.currentDate==logDate){
                    //                         return(
                    //                             <>
                    //                             <div className="oneData">{arr.attendance} </div>
                    //                             </>
                    //                         )
                    //                     }
                    //                 })
                    //             })
                    //         }
                    //         </div>
                    //     )
                    // }
                    
                })
                }
            </div>

        </div>
    </div>
  )
}

export default Attendance
