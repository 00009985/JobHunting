import React from 'react'
import './components.css'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'

const JobCard = ({item}) => {

  const { isLoading, error, data} = useQuery({
    queryKey: ["item.userId"],
    queryFn: () =>
      newRequest.get(`/users/${item.companyId}`).then((res) => {
        return res.data;
      })
  })

  return (
    <Link to={`/job/${item._id}`} className='link'>
    <div className='jobcard'>
      { isLoading ? ("loading") 
      :error ? ("Something went wrong")
      : (<div>
          <img className='img_job' src={data.userImage || "/images/noavatar.jpg"} alt="" />
          <span>{data.username}</span>
      </div>)}
        <div className="job_left">
            <span>{item.jobName}</span>
            <span className='jobcompanyname'>{item.companyId}</span>
        </div>
        <div className="job_right">
            <img className='img_heart' src="./images/heart.png" alt="" />
            <span>{item.jobLocation}</span>
            <span>{item.Salary}</span>
        </div>
    </div>
    </Link>
    
  )
}

export default JobCard