import React, { useEffect, useState } from "react"
import "./ImageSlider.css"
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs"

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
  const [images, setImages] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchImages = async (getUrl) => {
    try {
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`)
      const data = await response.json()
      if (data) {
        setImages(data)
      }
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1)
  }
  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1)
  }

  useEffect(() => {
    if (url !== "") fetchImages(url)
  }, [url])

  console.log(images)

  if (loading) {
    return <div>Loading data...</div>
  }

  if (error !== null) return <div>Error! {error}</div>

  return (
    <div className='container'>
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className='arrow arrow-left'
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              src={imageItem.download_url}
              alt={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : " current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className='arrow arrow-right'
      />
      <span className='circle-indicators'>
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currentSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  )
}

export default ImageSlider
