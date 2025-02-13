import React, { useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { Helmet } from 'react-helmet-async';

export default function Wishlist() {

  const { wishlist, isLoading, removeFromWishlist}= useContext(WishlistContext);
  const [loadingProductId, setLoadingProductId] = useState(null); 

  const {addToCart} = useContext(CartContext);

  async function addProductToCart(productId) {
    setLoadingProductId(productId); 
    const res = await addToCart(productId);

    if (res.status === "success") {
      toast("Product added to Cart successfully", {
        type: "success",
        position: "bottom-right",
        theme: "dark",
      });
     await removeFromWishlist(productId);
    } else {
      toast.error("Error adding product to cart");
    }
    setLoadingProductId(null);
  }

    async function removeProductFromWishlist(productId) {
     const res = await removeFromWishlist(productId);    
    //  console.log(res);
     if (res.status === 'success') {
          toast('Product removed from Wishlist successfully', {
            type: 'success',
            position: 'bottom-right',
          }); 
    }
    else{
      toast.error('Error removing product from Wishlist');
    }
   }

  return (
    <section className="py-24">

        <Helmet>
        <title>WishList Page</title>
        </Helmet>
     
      <div className="container mx-auto px-3">

      {isLoading && <div className='text-center my-56'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

        <div className='flex justify-between items-center pt-8 pb-8'>

      {!isLoading && <h2 className = 'text-3xl font-semibold text-green-700 m-auto'>Wishlist</h2>}

      {/* {wishlist && wishlist.length? <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      <i className='fa-solid fa-trash'></i>
      </button> : null
      } */}
      </div>

      {wishlist && wishlist.length?
    
        <div className="row">
        {wishlist && wishlist.map(item => (
          <div key={item.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-3">
          
          <div className='bg-white border border-gray-200 rounded-lg shadow-sm group'>
          
          <div className='h-64 flex items-center justify-center bg-gray-50'>
          <img src={item.imageCover} alt={item.title}  className="max-h-full max-w-full object-contain" />
        </div>

          <h3 className="text-center font-semibold text-green-700 py-3 px-3 truncate">{item.title}</h3>  
          <div className=" flex justify-between px-4">
          <span className="text-center font-semibold pb-4">{item.price} EGP</span>
          <span>{item.ratingsAverage}<i className='fa fa-star text-yellow-400 px-2'></i></span>          
          </div>
          {/* <p className="text-center font-semibold pb-4">{item.sold}</p>*/}
          <button onClick= {()=> removeProductFromWishlist(item.id)} 
            className="font-medium text-red-600 dark:text-red-500 m-auto block pb-2">
              <i className="fa-solid fa-trash"></i> Remove
            </button> 

        <button className='btn btn-success my-2 w-[80%] m-auto opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all group-hover:duration-200 block' onClick={()=> addProductToCart(item.id)}>
              {loadingProductId === item.id ? <i className='fa fa-spinner fa-spin'></i> : 'Add To Cart'}
                </button>
              </div>
          </div>
            ))}
        </div>
        : 
    !isLoading && <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
        <span className="font-medium text-xl">Your Wishlist is Empty.</span> 
          </div>
    }

    </div>
    </section>
  );
}
