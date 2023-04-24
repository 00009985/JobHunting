import React, { useEffect, useState } from 'react'
import axios from 'axios'
import newRequest from '../../utils/newRequest'

function Favorite(props) {
 const [Favorited, setFavorited] = useState(false)
 const variable = {
        userFrom: props.userFrom,
        jobId: props.jobId,
        jobName: props.jobInfo.jobName,
        jobSalary: props.jobInfo.Salary,
    }
    useEffect(() => {
        axios.post("/api/favorite/favorited", variable)
        .then(response => {
            if (response.data.success){
                setFavoriteNumber(res.data.favorited) 
            } else {
                alert("Failed to get info")
            }
        })
    }, [])

  const onClickFavorite = async () => {
    console.log(variable)
    if (Favorited) {
        //if already added
        await axios.post('/api/favorite/removeFromFavorite', variable)
        .then(response => {
            if(response.data.success){
                setFavorited(!Favorited)
            }else{
               console.log(error.response.data)
            }
        })
    }else {
        //if not added
        await axios.post('/api/favorite/addToFavorite')
        .then((response) => {
            if(response.data.success){
                setFavorited(!Favorited)
            }else{
                console.log(error.response.data)
            }
        })
    }
  }
  return (
    <div className='Favorite'>
        <button onClick={onClickFavorite}> {Favorited ? "remove from Favorite" : "Add to Favorite"}</button>
    </div>
  )
}

export default Favorite