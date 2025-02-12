import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { WishlistContext } from '../../Context/WishlistContext';

export default function SingleProduct({product}) {

  const {addToCart} = useContext(CartContext);

  const {addToWishlist, wishlist, removeFromWishlist} = useContext(WishlistContext);

  const [isLoading, setIsLoading] = useState(false);

  const [loadingProductId, setLoadingProductId] = useState(null); 

  const isInWishlist = wishlist.filter((item) => item.id === product.id).length > 0;


      async function addProductToCart(productId) {
        setIsLoading(true);
      const res =  await addToCart(productId);
      
      if (res.status === 'success') {
      
        toast('Product added to cart successfully', {
          type: 'success',
          position: 'bottom-right',
          theme: 'dark',
        });  
        setIsLoading(false);
      }
      else{
        toast('Error adding product to cart');
        setIsLoading(false);
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


  return (
        
        <div className="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6  px-3 space-y-2 mb-6 group">

          <div className='border px-2 text-center relative'>

          <button className={`absolute top-2 right-5 text-2xl ${isInWishlist ? "text-red-500" : "text-gray-500"}`}
          onClick={() => toggleWishlist(product.id)}>

         {loadingProductId === product.id ?  <i className="fa fa-spinner fa-spin"></i> : 
          
          <i className="fa-solid fa-heart"></i> }

        </button>

          <Link to={`/product-details/${product.id}/${product.category._id}`}>
            
            <img src={product.imageCover} alt={product.title} className='w-full'/>
            
            <span className='text-sm text-green-500'>{product.category.name}</span>
            
            <h3 className='text-lg font-semibold truncate'>{product.title}</h3>
            
            <div className='flex justify-between'>
            <span>{product.price} EGP</span>                
            <span>
              {product.ratingsAverage}<i className='fa fa-star text-yellow-400 px-2'></i>
            </span>            
              </div>
            
            </Link>

          <button className='btn btn-success my-2 w-[80%] m-auto opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all group-hover:duration-200 block' onClick={()=> addProductToCart(product.id)}>
          {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Add To Cart'}

          </button>
    </div>


        </div>

  )
}

