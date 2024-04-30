// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {item} = props
  const {title, brand, imageUrl, rating, price} = item
  return (
    <li className="similar-product-item-container">
      <img
        className="similar-product-item-image"
        src={imageUrl}
        alt={`similar product ${title}`}
      />
      <h1 className="similar-product-item-title">{title}</h1>
      <p className="similar-price-item-brand">By {brand}</p>
      <div className="similar-product-item-rating-price">
        <p className="similar-product-item-price">Rs {price}/-</p>
        <div className="similar-product-rating-container">
          <p className="similar-product-rating">{rating}</p>
          <img
            className="similar-product-rating-img"
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
          />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
