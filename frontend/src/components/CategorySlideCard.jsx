import React from 'react'
import { Link } from "react-router-dom";
import "./components.css"

const CategorySlideCard = ({item}) => {
  return (
    <Link to="/jobs?category=Remote">
    <div className='categoryslide_card'>
        <img className='card_img' src={item.img} alt="" />
        <span className='card_desc'>{item.desc}</span>
        <span className='card_title'>{item.title}</span>
    </div>
    </Link>
    
  )
}

export default CategorySlideCard