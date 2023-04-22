import React from 'react'
import "./pages.css"
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
const Applications = () => {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const navigate = useNavigate()

  const { isLoading, error, data} = useQuery({
    queryKey: ['applications'],
    queryFn: () =>
      newRequest.get(`/applications`).then((res) => {
        return res.data;
      })
  })

  const handleContact = async (application) => {
    const CompanyId = application.CompanyId
    const ApplicantId = application.ApplicantId
    const id = CompanyId + ApplicantId

    try {
      const res = await newRequest.get(`/conversations/single/${id}`)
      navigate(`/messages/${res.data.id}`)
      
    } catch (error) {
      if(error.response.status===404){
        const res = await newRequest.post(`/conversations/`, 
        {to: currentUser.isRecruiter ? ApplicantId : CompanyId,})
        
        navigate(`/messages/${res.data.id}`)
      }
    }
  }
  console.log(currentUser)



  return (
    <div className='applications'>
      {isLoading ? "loading"
      : error ? "Something went wrong" 
      : (<div className="myapplications_container">
          <div className="myJobs_top">
            <h1>My Applications</h1>
          </div>
          <table>
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>{currentUser?.isRecruiter ? "Applicant Name" : "Company Name"}</th>
              <th>Action</th>
              <th>Contact</th>
            </tr>
           { data.map((application) => ( 
           <tr key={application._id}>
              <td>
                {application.jobName}
              </td>
              <td>{application.Salary}</td>
              <td>{data.username}</td>
              <td className='job_buttons'>
                <button className='btn_deletejob'>Delete</button>
                <button className='btn_editjob'>Edit</button>
                <button onClick={() => handleContact(application)}>contact</button>
              </td>
            </tr>))}
          </table>
        </div>)}
    </div>
  )
}

export default Applications