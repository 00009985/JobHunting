import React, { useEffect, useState } from 'react';
import "./pages.css";
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

function FavoritePage() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const queryClient = useQueryClient();
  
    const navigate = useNavigate()
  
    const { isLoading, error, data} = useQuery({
      queryKey: ['favorite'],
      queryFn: () =>
        newRequest.get(`/favorite`).then((res) => {
          return res.data;
        })
    })

    const mutation = useMutation({
        mutationFn: (id) => {
          return newRequest.delete(`/favorite/${id}`)
        },
        onSuccess: () => {
          queryClient.invalidateQueries(["favorite"])
        }
      })
      const handleDelete = (id) => {
        mutation.mutate(id)
      }


  return (
    <div className='FavoritePage'>
        <h1>Favorite List</h1>
        <div className='favorite_table'>
        {isLoading ?  ("loading") :
        error ? ("Something went wrong") :
        (<table>
            <thead>
                <tr>
                    <th>Job Name</th>
                    <th>Job Salary</th>
                    <th>Remove</th>
                </tr>
            </thead>
            { data.map((favorite) => ( 
           <tr key={favorite._id}>
              <td>
                {favorite.jobName}
              </td>
              <td>{favorite.jobSalary}</td>
              <td className='job_buttons'>
                <button className='btn_deletejob' onClick={()  => handleDelete(favorite._id)}>Remove</button>
              </td>
            </tr>))}
        </table>)}
        </div>
    </div>
  )
}

export default FavoritePage