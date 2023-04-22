import React from 'react'
import "./components.css"
import Slider from 'infinite-react-carousel'
import CategorySlideCard from './CategorySlideCard'
import {cards} from "./../data"
const CategorySlide = () => {
  return (
    <div className='category_slide'>
        <div className="categoryslide_container">
          <Slider dots slidesToShow={5}>
            {cards.map(card=>
              (<CategorySlideCard item={card} key={card.id}/>
              ))}
          </Slider>
        </div>
    </div>
  );
}

export default CategorySlide