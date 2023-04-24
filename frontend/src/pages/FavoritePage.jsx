import React, { useEffect, useState } from 'react';
import "./pages.css";
import axios  from 'axios';

function FavoritePage() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [FavoriteJobs, setFavoriteJobs] = useState([])
  const variables = { userFrom: localStorage.getItem(currentUser._id)}
  useEffect(() => {
    axios.post('/api/favorite/getFavoriteJobs', variables)
    .then(response => {
        if (response.data.success){
            setFavoriteJobs(response.data.favorites)
        }else{
            alert("Failed to get favorite jobs")
        }
    })
  }, [])

  const renderTableBody = FavoriteJobs.map((job, index) => {
    return <tr>
        <td>{job.jobName}</td>
        <td>{job.Salary}</td>
        <td><button>Remove</button></td>
        
    </tr>
  })
  return (
    <div className='FavoritePage'>
        <h1>Favorite List</h1>

        <table>
            <thead>
                <tr>
                    <th>Job Name</th>
                    <th>Job Salary</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {renderTableBody}
            </tbody>
        </table>
    </div>
  )
}

export default FavoritePage