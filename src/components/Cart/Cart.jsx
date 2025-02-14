import React, { useState } from 'react'
import classes from './Cart.module.css'
import { useContext } from 'react';
import { CartContext } from './../../Context/CartContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';


export default function Cart() {

  const {cartDetails, removeFromCart, updateCartProduct, clearCart, isLoading, numOfCartItems} = useContext(CartContext);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingType, setLoadingType] = useState(null); 

  async function removeProductFromCart(productId) {
   const res = await removeFromCart(productId);    
  //  console.log(res);
   if (res.status === 'success') {
        toast('Product removed from cart successfully', {
          type: 'success',
          position: 'bottom-right',
        }); 
  }
  else{
    toast.error('Error removing product from cart');
  }
 }

 async function updateCart(productId, count, type) {
  setLoadingProductId(productId);
  setLoadingType(type);
    const res = await updateCartProduct(productId, count);
    // console.log(res);
    if (res.status === 'success') {
      toast('Product count updated successfully', {
        type: 'success',
        position: 'bottom-right',
      }); 
}
    else{
      toast.error('Error updating count of product from cart');
    }
    setLoadingProductId(null);
    setLoadingType(null);
    }

  return (
    <>
      <section className= {`${classes.Cart} py-[1rem]`}>

            <Helmet>
            <title>Cart Page</title>
            </Helmet>

      <div className="container mx-auto px-3">
      
      {isLoading && <div className='text-center my-56'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}

      <div className='flex justify-between items-center pt-32 pb-8'>

      {!isLoading && <h2 className = 'text-3xl font-semibold'>Cart Details</h2>}

      {cartDetails && cartDetails.products.length? <button onClick={clearCart} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
      <i className='fa-solid fa-trash'></i>
      </button> : null
      }
      </div>


  {cartDetails && cartDetails.products.length ? (

  <>

  <div>
    <h3 className='text-center py-2 text-lg font-semibold'>Total Price: <span className='text-green-500'>{cartDetails.totalCartPrice} EGP</span></h3>
    <h4 className='py-2 text-lg font-semibold text-start pb-8'>Total Number of Items: <span className='text-green-500'>{numOfCartItems}</span></h4>

  </div>
  <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-16 py-3">
            <span className="sr-only">Image</span>
          </th>
          <th scope="col" className="px-6 py-3">
            Product
          </th>
          <th scope="col" className="px-6 py-3">
            Qty
          </th>
          <th scope="col" className="px-6 py-3">
            Price
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody>

      {cartDetails.products.map(product => (
                <tr  key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.product.title}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button onClick={()=> updateCart(product.product.id, product.count-1, 'decrease')}
                    
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                     
                     {loadingProductId === product.product.id && loadingType === 'decrease' ? (
                              <i className="fa fa-spinner fa-spin"></i> 
                            ) : (
                              <>
                      <span className="sr-only">Quantity button</span>
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                              </>
                            )}

                    </button>
                    <div>
                      <span>{product.count}</span>
                    </div>
                    <button onClick={()=> updateCart(product.product.id, product.count+1, 'increase')} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">

                       {loadingProductId === product.product.id && loadingType === 'increase'? (
                              <i className="fa fa-spinner fa-spin"></i> 
                            ) : (
                              <>
                              <span className="sr-only">Quantity button</span>
                              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                              </svg>
                              </>

                            )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product.price * product.count} EGP
                </td>
                <td className="px-6 py-4">
                  <button onClick= {()=> removeProductFromCart(product.product.id)} 
                  className="font-medium text-red-600 dark:text-red-500 ">
                    <i className="fa-solid fa-trash"></i> Remove
                    </button>
                </td>
              </tr>
      ))} 


      </tbody>
    </table>
  </div>

  <Link to={"/checkout"} className='btn btn-success w-full block text-center my-4'>Checkout</Link>      

  </>

  ) : 
  (
    !isLoading && <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
    <span className="font-medium">Info alert! There is no items in your cart. You can continue shopping from </span> 
    <Link to= '/' className='font-extrabold px-1 text-green-600'>Here</Link>
     </div>
  )

}        
      </div>
    </section>

    </>
  )
}
