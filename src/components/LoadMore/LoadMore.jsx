import React, { useState, useEffect } from "react"
import "./LoadMore.css"

const LoadMore = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [count, setCount] = useState(0)
  const [disableButton, setDisableButton] = useState(false)

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`
      )
      const data = await response.json()
      if (data && data.products && data.products.length) {
        setProducts((prevData) => [...prevData, ...data.products])
      }
      console.log(data)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [count])

  useEffect(() => {
    if (products && products.length === 100) setDisableButton(true)
  }, [products])

  if (loading) return <div>Loading...</div>

  return (
    <div className='load-more-container'>
      <div className='product-container'>
        {products && products.length
          ? products.map((item, index) => (
              <div className='product' key={`${item.id}_${index}`}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))
          : null}
      </div>
      <div className='button-container'>
        <button disabled={disableButton} onClick={() => setCount(count + 1)}>
          Load More
        </button>
        {disableButton ? <p>You have reached 100 products</p> : null}
      </div>
    </div>
  )
}

export default LoadMore
