import React from 'react'
import "../components/components.css"
import Review from './Review'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
const Reviews = ({jobId}) => {

  const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: () =>
          newRequest.get(`/reviews/${jobId}`).then((res) => {
            return res.data;
          }),
      });

    const mutation = useMutation({
      mutationFn: (review) => {
        return newRequest.post("/reviews", review)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(["reviews"])
      }
    })

    const handleSubmit = (e) => {
      e.preventDefault();
      const description = e.target[0].value;
      const location = e.target[1].value;

      mutation.mutate({jobId, description, location});
    }

  return (
    <div className="reviews">
        <h2>Reviews</h2>
        {isLoading ? "loading" 
        :error ? "Something went wrong"
        : data.map((review) => <Review key={review._id} review={review}/>)} 
        <div className="add">
          <h3>Add a review</h3>
          <form action="" onSubmit={handleSubmit}>
            <input type="text" placeholder='add a review' />
            <input type="text" placeholder='location' />
            <button>Send</button>
          </form>
        </div>
    </div>
  )
}

export default Reviews