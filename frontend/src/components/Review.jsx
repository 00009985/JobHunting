import React from 'react'
import "../components/components.css"
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const Review = ({review}) => {
  
  const { isLoading, error, data } = useQuery({
    queryKey: [review.userId],
    queryFn: () =>
      newRequest.get(`/users/${review.userId}`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className='review'>
        <div className="review_item">
            {isLoading ? ("loading") 
            : error ? ("something went wrong"):
            (<div className="review_employee">
                <img
                src="../images/heart.png"
                alt=""
                className="review_user-image"
                />
                <div className="review_info">
                <span>{data.username}</span>
                <span>{review.location}</span>
                </div>
            </div>)}
            </div>
            <p>
            {review.description}
            </p>
            <div className="reviews_helpful">
            <span>Helpful?</span>
            <img src="../images/like.png" alt="" />
            <span>Yes</span>
            <img src="../images/dislike.png" alt="" />
            <span>No</span>
        </div>
    </div>
  )
}

export default Review