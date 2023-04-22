import React from 'react'
import "./pages.css"
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import moment from "moment"
const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      })
  })

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"])
    }
  })

  const handleRead = (id)=> {
    mutation.mutate(id)
  }
  const message = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi hic, dignissimos id sequi esse, ratione maiores quis enim repellat minus harum accusamus fugiat repellendus nihil quo ipsam? Dignissimos, nostrum ipsum."
  return (
    <div className='messages'>
      { isLoading ? "loading" 
      : error ? "Something went wrong"
      : (
      <div className="myjobs_container">
        <div className="myJobs_top">
          <h1>My Jobs</h1>
        </div>
        <table>
          <tbody>
          <tr>
            <th>{currentUser.isRecruiter? "Applicant" : "Company"}</th>
            <th>Last message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          </tbody>
            {data.map((conversation) => (
            <tr key={conversation.id}> 
                <td>
                  {currentUser.isRecruiter ? conversation.ApplicantId : conversation.companyId}
                </td>
                <td><Link to={`/message/${conversation.id}`}>{conversation?.lastMessage?.substring(0, 70)}...</Link></td>
                <td>{moment(conversation.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isRecruiter && !conversation.readByCompany) ||
                  (!currentUser.isRecruiter && !conversation.readByApplicant) &&
                  <button className='btn_deletejob' onClick={() => handleRead(conversation.id)}>Mark as read</button>)}
                </td>
            </tr>
            )
            )}
            
          
        </table>
      </div>)}
    </div>
  )
}

export default Messages