import React, { useState } from "react"
import "./StarRating.css"
import { FaStar } from "react-icons/fa"

const StarRating = ({ noOfStars = 5 }) => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const handleClick = (index) => {
    setRating(index)
  }
  const handleMouseMove = (index) => {
    setHover(index)
  }
  const handleMouseLeave = () => {
    setHover(rating)
  }
  return (
    <div className='star-rating'>
      {[...Array(noOfStars)].map((_, index) => {
        index += 1
        return (
          <FaStar
            key={index}
            className={index <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(index)}
            onMouseMove={() => handleMouseMove(index)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
          />
        )
      })}
    </div>
  )
}

export default StarRating
