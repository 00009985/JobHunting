import React from 'react'
import "./pages.css"
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const MyResumes = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['myResumes'],
    queryFn: () =>
      newRequest.get(`/resumes?userId=${currentUser._id}`).then((res) => {
        return res.data;
      })
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/resumes/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myResumes"])
    }
  })

  const handleDelete = (id) => {
    mutation.mutate(id)
  }

  return (
    <div className='myResumes'>
      {isLoading ? "loading"
      : error ? "Something went wrong"
      : (<div className="myresume_container">
        <div className="myresume_top">
          <h1>My Resumes</h1>
          {!currentUser.isRecruiter && (<Link to='/addresume'><button className="addnewjob">Add new Resume</button> </Link>)}
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Date created</th>
            <th>Action</th>
          </tr>
          {data.map((resume) => (
            <tr key={resume._id}>
            <td>
              {resume.resumeName}
            </td>
            <td>{resume.education}</td>
            <td>{resume.workExperience}</td>
            <td className='job_buttons'>
              <button className='btn_deletejob' onClick={() => handleDelete(resume._id)}>Delete</button>
              <button className='btn_editjob'>Edit</button>
            </td>
          </tr>))}
        </table>
      </div>)}
    </div>
  )
}

export default MyResumes