// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class ProductItemDetails extends Component {
  state = {
    productDetails: [],
    errorMsg: '',
    similarProducts: [],
    apiStatus: apiStatusConstants.initial,
  }

  getProductData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const fetchedData = await response.json()
    console.log(response.status)
    console.log(fetchedData)
    if (response.status === 200) {
      const updatedFetchedData = this.getFormattedData(fetchedData)
      const updatedSimilarProductsData = fetchedData.similar_products.map(
        item => this.getFormattedData(item),
      )
      console.log(updatedFetchedData)
      this.setState({
        productDetails: updatedFetchedData,
        similarProducts: updatedSimilarProductsData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 404) {
      this.setState({
        errorMsg: fetchedData.error_msg,
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  componentDidMount = () => {
    this.getProductData()
  }

  renderProductDetailsView = () => {
    const {productDetails, similarProducts} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
    } = productDetails

    return (
      <div className="product-details-container">
        <div className="main-product-details">
          <img className="main-product-img" src={imageUrl} alt="product" />
          <div className="main-products-details-content">
            <h1 className="main-product-title">{title}</h1>
            <p className="main-product-price">Rs {price} /-</p>
            <div className="main-product-rating-views">
              <div className="main-product-rating-container">
                <p className="main-product-rating">{rating}</p>
                <img
                  className="main-product-rating-img"
                  src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                  alt="star"
                />
              </div>
              <p className="main-product-reviews">{totalReviews} Reviews</p>
            </div>
            <p className="main-product-descripiton">{description}</p>
            <p className="main-product-other-details">
              Availability:
              <span className="main-product-other-values"> {availability}</span>
            </p>
            <p className="main-product-other-details">
              Brand:
              <span className="main-product-other-values"> {brand}</span>
            </p>
            <hr className="line" />
            <div className="product-add-container">
              <button className="product-add-symbol" data-testid="minus">
                <BsDashSquare />
              </button>
              <p className="product-quantity">1</p>
              <button className="product-add-symbol" data-testid="plus">
                <BsPlusSquare />
              </button>
            </div>
            <button className="add-card-btn">Add Cart</button>
          </div>
        </div>
        <div className="similar-products-container">
          <h1 className="similar-products-heading">Similar Products</h1>
          <ul className="similar-products-list">
            {similarProducts.map(item => (
              <SimilarProductItem item={item} key={item.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  getFormattedData = data => ({
    title: data.title,
    style: data.style,
    imageUrl: data.image_url,
    availability: data.availability,
    description: data.description,
    brand: data.brand,
    id: data.id,
    price: data.price,
    rating: data.rating,
    totalReviews: data.total_reviews,
  })

  renderFailureView = () => {
    const {errorMsg} = this.state
    return (
      <div className="product-details-faliure-container">
        <img
          className="failure-view-img"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png "
          alt="failure view"
        />
        <h1 className="failure-view-title">{errorMsg}</h1>
        <Link to="/products">
          <button className="continue-btn">Continue Shopping</button>
        </Link>
      </div>
    )
  }

  renderLoaderView = () => (
    <div className="profile-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  renderProductDetailsItem = () => {
    const {apiStatus} = this.state
    console.log('This is App constant')
    console.log(apiStatus)
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderProductDetailsItem()}
        </div>
      </>
    )
  }
}

export default ProductItemDetails
