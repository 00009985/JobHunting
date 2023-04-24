import React, { useReducer } from 'react'
import "./pages.css"
import { INITIAL_STATE, jobReducer } from '../reducers/jobReducer'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const EditJob = () => {

    const { isLoading, error, data } = useQuery({
        queryKey: ['job'],
        queryFn: () =>
          newRequest.get(`/jobs/single/${id}`).then((res) => {
            return res.data;
          }),
      });

  const [state, dispatch] = useReducer(jobReducer, INITIAL_STATE)

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: {name: e.target.name, value: e.target.value}
    })
  }

  const handleSkills = (e) => {
    e.preventDefault()
    dispatch({
      type: "ADD_SKILLS",
      payload: e.target[0].value,
    })
    e.target[0].value = "";
  }
  const navigate = useNavigate()

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (job) => {
      return newRequest.post(`/jobs`, job)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myJobs"])
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(state)
    navigate("/myjobs")
  }


  return (
    <div className='addJob'>
        
      <div className="addJob_container">
        <h1>Edit job</h1>
        <label htmlFor="" >Job Name</label>
        <input type="text" placeholder='WebDesigner' onChange={handleChange}  name='jobName'/>
        <label htmlFor="">Category</label>
        <select name="Category" id="Category" onChange={handleChange}>
          <option value="Internship">Internship</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="One time job">One time job</option>
        </select>
        <label htmlFor="">Description</label>
        <textarea name="description" id="" cols="30" rows="10" placeholder='job description' onChange={handleChange}></textarea>
        <label htmlFor="">Salary</label>
        <input type="number"onChange={handleChange} name='Salary' />
        <label htmlFor="">Experience</label>
        <select name="experience" id="" onChange={handleChange}>
          <option value="no">No</option>
          <option value="1-2">1-2 years</option>
          <option value="3-4">3-4 years</option>
        </select>
        <label htmlFor="">Add Skills</label>
        <form action="" onSubmit={handleSkills}>
          <input type="text" />
          <button type='Submit'>Add</button>
        </form>
        <div className="addedSkills">
          {state?.skills?.map((s) => (
            <div className="skill_item" key={s}>
              <button  onClick={() => dispatch({type: "REMOVE_SKILLS", payload: s})}>
                {s}
                <span>X</span>
              </button>
            </div>
          ))}
        </div>
        <button className='button_create' onClick={handleSubmit}>Create</button>
      </div>
    </div>
  )
}

export default EditJob