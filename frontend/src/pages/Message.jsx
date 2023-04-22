import React from 'react'
import "./pages.css"
import { Link, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const Message = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  const {id} = useParams();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ['messages'],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => {
        return res.data;
      })
  })

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"])
    }
  })

  const handleSubmit = (e)=> {
    e.preventDefault()
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    })
    e.target[0].value = "";
  }

  return (
    <div className='message'>
      {isLoading ? "loading"
          : error ? "Something went wrong"
          : ( <div className="message_container">
          <Link to="/messages">Back to messages</Link>
          <div className="messages_message">
            {data.map((message) => (
              <div className={message.userId === currentUser._id ? "owner message_item" : "message_item"} key={message._id}>
              <img className='message_image' src="../images/heart.png" alt="" />
              <p className='message_content'>
                {message.desc}
              </p>
            </div>))}
          </div>
          <div className="write">
            <form action="" onSubmit={handleSubmit}>
              <textarea placeholder='write a message' name="" id="" cols="30" rows="10"></textarea>
              <button className='buttonsendmessage' type='submit'>Send</button>
            </form>
        </div>
          </div>)}
    </div>
  )
}

export default Message