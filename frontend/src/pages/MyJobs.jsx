import React from 'react'
import "./pages.css"
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const MyJobs = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['myJobs'],
    queryFn: () =>
      newRequest.get(`/jobs?userId=${currentUser.id}`).then((res) => {
        return res.data;
      })
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/jobs/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"])
    }
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className='myJobs'>
      {isLoading ? "loading"
      : error ? "Something went wrong"
      : (<div className="myjobs_container">
        <div className="myJobs_top">
          <h1>My Jobs</h1>
          {currentUser.isRecruiter && (<Link to='/addjob'><button className="addnewjob">Add new job</button> </Link>)}
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Applies</th>
            <th>Action</th>
          </tr>
          {data.map((job) => (
            <tr key={job._id}>
            <td>
              {job.jobName}
            </td>
            <td>{job.Salary}</td>
            <td>{job.applyNumber}</td>
            <td className='job_buttons'>
              <button className='btn_deletejob' onClick={() => handleDelete(job._id)}>Delete</button>
              <button className='btn_editjob'>Edit</button>
            </td>
          </tr>))}
        </table>
      </div>)}
    </div>
  )
}

export default MyJobs