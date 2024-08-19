import React, { useEffect, useState } from 'react'
import TableCard from './smallComponents/TableCard'
import axios from 'axios'
import "../../styles/TableSection.css"

const TableSection = () => {

    const [table,setTable] = useState({
        tableName:"",
        tableSeatingNo:0
    })
    const [showTablesArray,setShowTablesArray]=useState([]) ;

    function inputHandler(e){
        const {value,name} = e.target;
        // console.log(value,name)
        setTable((preval)=>{
            return (
                {
                    ...preval,
                    [name] : value
                }
            )
        })
    }

    async function addTable(e){
        e.preventDefault();

        if(table.tableName != "" && table.tableSeatingNo!=0){

        
            // console.log(table)
            const response = await axios.post("/home/table", table);
            // console.log(response)
            if(response.data === "present"){
                alert("Table is already added");
                setTable({tableName:"",tableSeatingNo:0})
            }
            else{
                // alert("Table Added")
                await getTables()
                setTable({tableName:"",tableSeatingNo:0})
            }
        }
        else{
            alert("Enter proper details");
        }
    }

    // function for getting the data to show the tables 

    async function getTables(){
        try{
            const showTables = await axios.get("/home/table")
            setShowTablesArray(showTables.data);    // useState used because when its value changes then it re-renders and showTablesArray changes and thus dom manipulate   
            // console.log("this is insider",showTablesArray)
        }
        catch(e){
            console.log("errorrr",e);
        }
    }

    useEffect(()=>{
        getTables();
    },[]);

    const del = async(name,number)=>{
        try{
            let con=window.confirm("Are you sure You want to delete",name);
            if(con){

                console.log("delete",name,number);
                const response = await axios.delete(`/home/table?tableName=${name}`)
                console.log(response);
                getTables();
            }


        }catch(e){
            console.log("erron in deleting axios ",e)
        }

    }

  return (
    <div style={{backgroundColor: "#1F1D2B"}}>
       <div style={{padding:"10px",fontSize:"1.3rem",backgroundColor: "#1F1D2B",color:"white"}}>
        Table Management
        </div> 
      <div className="viewTable m-3">
        {showTablesArray.map((table)=>{
            return(
                <TableCard name={table.tableName} number={table.tableSeatingNo} delFunction={del} />
            )
        })}
      </div>
      <div className="addTable" >
        <form action="" style={{backgroundColor: "#1F1D2B"}}>
            <input type="text" style={{margin:"0 20px",backgroundColor:" #413E3E"}} name="tableName" placeholder='Table Name...' value={table.tableName} onChange={inputHandler} required />
            <input type="number" style={{margin:"0 20px",backgroundColor:" #413E3E"}} name="tableSeatingNo" placeholder='Seating Number...' value={table.tableSeatingNo} onChange={inputHandler} required/>
            <button onClick={addTable} style={{margin:"0 20px",color:"white",backgroundColor:" #413E3E"}}>Add Table</button>
        </form>
      </div>
    </div>
  )
}

export default TableSection
