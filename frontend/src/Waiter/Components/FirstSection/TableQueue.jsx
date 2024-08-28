import React, { useState,useEffect } from 'react'
import axios from 'axios'


const TableQueue = (props) => {
  
  const [activeTable, setActiveTable] = useState();
  const handleTableClick = (table) => {
    setActiveTable(table);
    props.currentTable(table);
  };

  // const [showTablesArray,setShowTablesArray]=useState([]) ;

  // async function getTables(){
  //   try{
  //       const showTables = await axios.get("/home/table")
  //       setShowTablesArray(showTables.data);    // useState used because when its value changes then it re-renders and showTablesArray changes and thus dom manipulate   
  //       // console.log("this is insider",showTablesArray)
  //   }
  //   catch(e){
  //       console.log("errorrr",e);
  //   }
  // }

  // useEffect(()=>{
  //     getTables();
  // },[]);

  let tableName = props.tables;

  return (
    <div className='TableQueue'>
      {
        tableName.map((table)=>{
          return (<button  style={{margin: "12px 0"}} className={`buttonPrimary ${activeTable === table ? 'tableAction' : ''}`} 
            onClick={()=>
              {handleTableClick(table)}}>
            {table}</button>)
        })
      }
    </div>
  )
}

export default TableQueue
