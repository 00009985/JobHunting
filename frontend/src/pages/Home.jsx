import React from 'react'
import CategorySlide from '../components/CategorySlide'
import Header from '../components/Header'
import "./pages.css"

const Home = () => {
  return (
    <div className='home'>
      <Header/>
      <CategorySlide />
    </div>
  )
}

export default Home