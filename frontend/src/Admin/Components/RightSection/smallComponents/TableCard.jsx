import React from 'react'

const TableCard = (props) => {
  return (
    <>
      <div className="tableCard d-flex flex-column px-1 py-2" style={{width:"160px",height:"120px",border:"2px solid #413E3E",color:"white",backgroundColor: "#343030" }}>
            <div className="tableName">
                TableName : {props.name}
            </div>
            <div className="tableSeatingNo">
                TableSeating : {props.number}
            </div>
            <div className="delTable my-4">
                <button style={{width:"50%",color:"white",border:"unset",border:"1px solid #1F1D2B",borderRadius:"3px",backgroundColor:" #413E3E"}} onClick={()=>{props.delFunction(props.name,props.number)}} >Delete</button>
            </div>
      </div>
    </>
  )
}

export default TableCard
