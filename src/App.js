
import React, { useReducer, useState } from 'react';
import './App.scss';
import Header from './component/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Render from './component/Render';

function App() {
  const initState = JSON.parse(localStorage.getItem("listJob")) || [];
  const [isEdit, setIsEdit] = useState(null)
  const handleEdit = (id) => {
    const findJob = initState.find((job) => {
      return job.id === id;
    })
    setIsEdit(findJob);
  }
  function reducer(state, action) {
    switch (action.type) {
      case "handleSubmit":
        localStorage.setItem("listJob", JSON.stringify([...state, action.newJob]))
        return [...state, action.newJob];
      case "handleDel":
        const filterJob = state.filter(job => job.id !== action.idJob)
        localStorage.setItem("listJob", JSON.stringify(filterJob))
        return filterJob;
      case "handleComplete":
        const filterComplete = state.map((job) => {
          if (job.id === action.id) {
            return { ...job, complete: !job.complete }
          } else {
            return job;
          }
        })
        localStorage.setItem("listJob", JSON.stringify(filterComplete));
        return filterComplete;
      case "handleUpdate":
        console.log("update");
        const updatedJobs = state.map((job) => {
          if (job.id === action.updateJob.id) {
            return action.updateJob
          }
          return job;
        })
        localStorage.setItem("listJob", JSON.stringify(updatedJobs));
        return updatedJobs;
      default:
        throw new Error();
    }

  }
  const [state, dispatch] = useReducer(reducer, initState)
  return (
    <div className='container-all'>
      <div className='header-container'>
        <Header handleSubmit={dispatch} isEdit={isEdit} handleUpdate={dispatch} />
      </div>
      <Render handleDel={dispatch} state={state} handleComplete={dispatch} handleEdit={handleEdit} x />

    </div>
  );
}

export default App;
