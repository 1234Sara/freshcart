import React, { useContext, useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import RelatedProducts from './../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../Context/WishlistContext';
import { Helmet } from 'react-helmet-async';

export default function ProductDetails() {

  const [productDetails, setProductDetails] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

  // console.log(id);

  const {addToCart} = useContext(CartContext);

 const {addToWishlist, wishlist, removeFromWishlist} = useContext(WishlistContext);  

 const [loadingProductId, setLoadingProductId] = useState(null); 

 const isInWishlist = productDetails ? wishlist.some((item) => item.id === productDetails.id) : false;


 async function addProductToCart(productId) {
      setLoading(true);

    const res =  await addToCart(productId);
    
    if (res.status === 'success') {
    
      toast('Product added to cart successfully', {
        type: 'success',
        position: 'bottom-right',
        theme: 'dark',
        
      });  
      setLoading(false);

    }
    else{
      toast('Error adding product to cart');
      setLoading(false);

    }
    }

    async function toggleWishlist(productId) {
      setLoadingProductId(productId)
      if (isInWishlist) {
        await removeFromWishlist(productId);
        toast("Removed from wishlist", {
            type: "success",
            position: "bottom-right",
            theme: "light",
          });
      } else {
        await addToWishlist(productId);
        toast("Added to wishlist", {
          type: "success",
          position: "bottom-right",
          theme: "light",
        });
      }
      setLoadingProductId(null);
    }

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };

async function getProductDetails() {
      setIsLoading(true);
  try {

  const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)

    // console.log(data);

  setProductDetails(data.data)
  setApiError(null);
  
  } catch (error) {
  // console.log(error);
    setApiError(error.response.data.message);
    setProductDetails(null);
  }
  finally{
    setIsLoading(false);
  }
}
  useEffect(() => {
  
    getProductDetails()

  }, [id])

  return (
    <>
    <section className={`py-20 ${classes.ProductDetails}`}>


      <div className="container mx-auto px-3">

      {isLoading && <div className='text-center'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

      {apiError && <p className='alert alert-danger'>{apiError}</p>}

      {productDetails && 

                <div className="row items-center">
        
                  <Helmet>
                  <title>{productDetails.title} </title>
                  <meta name="description" content={productDetails.description} />
                  <meta name="keywords" content={productDetails.slug.replaceAll("-", ", ")} />
                  </Helmet> 
          
                <div className="w-1/3 px-3">
                  

                <Slider {...settings}>

                  {
                    productDetails.images.map((src, index) =>(
                <img src={src} alt={productDetails.title} key={index} className='w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'/>
                    ))}

                </Slider>

                </div>
      
                <div className="w-2/3 px-3 space-y-6 relative">
                  <h1 className='text-4xl font-semibold py-6'>{productDetails.title}</h1>
          
          <button className={`absolute top-2 right-5 text-2xl ${isInWishlist ? "text-red-500" : "text-gray-500"}`}
          onClick={() => toggleWishlist(productDetails.id)}>
            {loadingProductId === productDetails.id ?  <i className="fa fa-spinner fa-spin"></i> : <i className="fa-solid fa-heart"></i> }
        </button>
        
                  <p>{productDetails.description}</p>
                  <div className='flex justify-between'>
      
                    <div className='flex flex-col'>
                      <span>{productDetails.category.name}</span>
                      <span>{productDetails.price} EGP</span>
                    </div>
      
                    <div>
                      <span>{productDetails.ratingsAverage}</span>
                      <i className='fa fa-star text-yellow-400 px-2'></i>
                    </div>
                  </div>
                    <button onClick={()=> addProductToCart(productDetails.id)}  className='btn btn-success w-full'>
                    {loading ? <i className='fa fa-spinner fa-spin'></i> : 'Add To Cart'}
                    </button>
                </div>          
      
              </div>
      }

      </div>      
    </section>

      <RelatedProducts/>
    </>
  )
}


