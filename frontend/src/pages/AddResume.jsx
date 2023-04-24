import React, { useReducer } from 'react'
import "./pages.css"
import { INITIAL_STATE, resumeReducer } from '../reducers/resumeReducer'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import newRequest from '../../utils/newRequest'
import { useNavigate } from 'react-router-dom'

const AddResume = () => {

  const [state, dispatch] = useReducer(resumeReducer, INITIAL_STATE)

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
    mutationFn: (resume) => {
      return newRequest.post(`/resumes`, resume)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myResumes"])
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(state)
    navigate("/myresumes")
  }


  return (
    <div className='addResume'>
      <div className="addResume_container">
        <h1>Add new Resume</h1>
        <label htmlFor="" >Resume Name</label>
        <input type="text" placeholder='WebDesigner' onChange={handleChange}  name='resumeName'/>
        <label htmlFor="">Contact Number</label>
        <input type="number" name='contactNumber' onChange={handleChange}/>
        <label htmlFor="">Age</label>
        <input type="number" name='Age' onChange={handleChange}/>
        <label htmlFor="">Education</label>
        <input type="text"onChange={handleChange} name='education' />
        <label htmlFor="">workExperience</label>
        <input type="text" name='workExperience' onChange={handleChange}/>
        <label htmlFor="">Letter</label>
        <textarea name="letter" id="letter" cols="30" rows="10"></textarea>
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

export default AddResume