import JobCard from '../components/JobCard'
import "./pages.css"
import React, { useEffect, useRef, useState } from "react"
import newRequest from '../../utils/newRequest'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router-dom'

function Jobs () {

  const [sort, setSort] = useState("date");
  const [open, setOpen] = useState(false)
  const minRef = useRef();
  const maxRef = useRef();

  const {search} = useLocation()

  const reSort = (type) => {
    setSort(type)
    setOpen(false)
  }

  useEffect(() => {
    refetch();
  }, [sort]);
  const apply = () => {
    refetch()
  }


    const { isLoading, error, data, refetch } = useQuery({
      queryKey: ['jobs'],
      queryFn: () =>
        newRequest.get(`/jobs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`).then((res) => {
          return res.data;
        })
    })

    console.log(data)
  
  return (
    <div className='jobs'>
      <div className="jobs_container">
        <h1>Internships</h1>
        <div className="jobs_filtering">
          <div className="jobs_filteringleft">
            <span>Salary</span>
            <input className='salary_input' type="text" placeholder='min' ref={minRef}/>
            <input className='salary_input' type="text" placeholder='max' ref={maxRef}/>
            <button className='btn_sort' onClick={apply}>Sort</button>
          </div>
          <div className="jobs_filteringright">
            <span className='sortby'>Sort By</span>
            <span className='sortOptions'>{sort == "date" ? "Newest" : "By Abc"}</span>
            <img className='img_down' src="./images/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && 
            (<div className="jobs_rightmenu">
              {sort == "date" ? 
              (<span onClick={() =>reSort("createdAt")}>by abc</span>)
              : 
              (<span onClick={() =>reSort("sales")}>Newest</span>)}
            </div>)}
          </div>
        </div>
        <div className="jobscard">
          {  isLoading ? "loading" 
          : error ? "Something went wrong" 
          : data.map((job) => (<JobCard key={job._id} item={job}/>))}
        </div>
      </div>
      
    </div>
  )
}

export default Jobs