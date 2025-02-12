import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { Helmet } from 'react-helmet-async';

export default function MyOrders() {
  const [myOrders, setMyOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const { userId } = useContext(AuthContext);


  async function getMyOrder() {

    setIsLoading(true);
    setApiError(null);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
      setMyOrders(data);
      Navigate('/allorders')
      setApiError(null);
      // console.log(data);
    } catch (error) {
      setApiError(error.response.data.statusMsg);
      setMyOrders(null);
    }
    finally{
      setIsLoading(false);
    } 
   }

  useEffect(() => {
    userId && getMyOrder();
  }, [userId]);

  return (
    <section>
      <div className="container mx-auto px-3">

        <Helmet>
        <title>All Orders Page</title>
        </Helmet>
  
      {isLoading && <div className='text-center my-56'><i className='fa fa-spinner fa-spin text-9xl'></i></div>}
      {apiError && <p className='alert alert-danger text-center my-20'>{apiError}</p>}

        {myOrders && myOrders? (
          
          <>
          
          <h2 className="text-3xl font-semibold pt-32 pb-8 text-center text-green-700">All Orders</h2>

          {myOrders && myOrders.map((order) => (
                        <div key={order._id} className="mb-8 p-4 bg-white shadow-md rounded-lg">
                          <h3 className="text-lg font-semibold  text-green-700 my-4">Order ID: {order.id}</h3>
                          <p className="text-green-700 text-center font-semibold">Total Price: {order.totalOrderPrice} EGP</p>
                          <p className="text-green-700 text-start font-semibold capitalize">Payment Method: {order.paymentMethodType}</p>
            
                          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                              <thead className="text-xs text-gray-700 uppercase bg-gray-50 text-center">
                                <tr>
                                  <th scope="col" className="px-6 py-3">Image</th>
                                  <th scope="col" className="px-6 py-3">Product</th>
                                  <th scope="col" className="px-6 py-3">Ordered At</th>
                                  <th scope="col" className="px-6 py-3">Time</th>
                                  <th scope="col" className="px-6 py-3">Qty</th>
                                  <th scope="col" className="px-6 py-3">Price</th>
                                  <th scope="col" className="px-6 py-3">Is Delivered</th>
                                  <th scope="col" className="px-6 py-3">Is Paid</th>
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                {order.cartItems.map((item) => (
                                  <tr key={item._id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                      <img
                                        src={item.product.imageCover}
                                        alt={item.product.title}
                                        className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                                      />
                                    </td>
                                    <td className="px-6 py-4 font-semibold">{item.product.title}</td>
                                    <td className="px-6 py-4 font-semibold">{order.createdAt.split("").slice(0,10)}</td>
                                    <td className="px-6 py-4 font-semibold">{order.createdAt.split("").slice(11, 19)}</td>
                                    <td className="px-6 py-4">{item.count}</td>
                                    <td className="px-6 py-4 font-semibold">{item.price} EGP</td>
                                    <td className="px-6 py-4 font-semibold">{order.isDelivered ? "Delivered ✅" : "Not Delivered ❌"}</td>
                                    <td className="px-6 py-4 font-semibold">{order.isPaid ? "Paid ✅" : "Not Paid ❌"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))
          }
          </>
        )
        : 
        (!isLoading &&
          <div className="p-4 text-sm text-blue-800 bg-blue-50 rounded-lg">
            <span className="font-medium">No orders found.</span>
            <Link to="/" className="font-extrabold px-1 text-green-600">
              Continue Shopping
            </Link>
          </div>
        )
        }
      </div>
    </section>
  );
}



