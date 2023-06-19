import { useState } from 'react';
import Table from 'react-bootstrap/Table';

function Render({state,handleDel, handleComplete,handleEdit}) {
  return (
    <Table striped bordered hover className='render-table'>
      <thead>
        <tr>
          <th colSpan={4}>To do list - You have {state.length} tasks to complete!</th>
        </tr>
      </thead>
      {
        state.map((item,index)=> (
        <tbody>
            <tr key={index}>
              <td>{index + 1}</td>
              <td><input type="checkbox" checked={item.complete} onChange={() => handleComplete({type:"handleComplete", id: item.id})}/></td>
              <td className={`${item.complete ? "complete" : ""}`}>{item.job}</td>
              <td><button className='edit-button' onClick={()=>handleEdit(item.id)}>Edit</button>
              <button className='del-button' onClick={()=>handleDel({type: "handleDel", idJob:item.id})}>Delete</button>
              </td>
            </tr>
          </tbody>))
      }
      
    </Table>
  );
}

export default Render;