import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext(null);

export default function CartContextProvider({children}) {
  
const [numOfCartItems, setNumOfCartItems] = useState(0);

const [cartDetails, setCartDetails] = useState(null);

const [cartId, setCartId] = useState(null);

const { token } = useContext(AuthContext); 

const [isLoading, setIsLoading] = useState(false);


const headers = {token};

const API_URL = "https://ecommerce.routemisr.com/api/v1/cart";

useEffect(() => {
  token && getCartDetails();
}, [token])



  async function addToCart(productId) {
        try {
            
       const {data} = await axios.post(API_URL, {productId}, {headers});
          // console.log(data);

          if (data.status === 'success') {
          await getCartDetails();
          }
          return data;  
        } 

        catch (error) {
          // console.log(error);
            return error;
        }
    }

  async function getCartDetails() {
        setIsLoading(true);
      try {
    
      const {data} = await axios.get(API_URL, {headers});
      // console.log(data);

        if (data.status === 'success') {

          setNumOfCartItems(data.numOfCartItems);

          setCartDetails(data.data);    

          setCartId(data.cartId);

          // setUserId(data.data.cartOwner);

        }

      return data;
    } 
    catch (error) {
            // console.log(error);
            return error; 
        }
        finally{
          setIsLoading(false);
        }
    
    }

  

   async function removeFromCart(productId) {
  
      setIsLoading(true);

      try {

    const {data} =  await axios.delete(`${API_URL}/${productId}`, {headers})
        // console.log(data);
        if (data.status === 'success') {

          setNumOfCartItems(data.numOfCartItems);

          setCartDetails(data.data);  
          
          setCartId(data.cartId);

          // setUserId(data.data.cartOwner);

        }
        return data;
      } catch (error) {
        return error;
      }
      finally{
        setIsLoading(false);
      }
    }

    async function updateCartProduct(productId, count) {
      try {

    const {data} =  await axios.put(`${API_URL}/${productId}`, {count} , {headers})
        // console.log(data);
        if (data.status === 'success') {

          setNumOfCartItems(data.numOfCartItems);

          setCartDetails(data.data);   
          
          setCartId(data.cartId);

          // setUserId(data.data.cartOwner);

          // setMyOrders(data);

        }
        return data;
      } catch (error) {
        return error;
      }
    }

    async function clearCart() {
      try {

    const {data} =  await axios.delete(API_URL , {headers})
    if (data.message === 'success') {

      setNumOfCartItems(0);

      setCartDetails(null);    

      setCartId(null);

      // setMyOrders(data);


    }
        // console.log(data);
        return data;
      } catch (error) {
        return error;
      }
    }

  async function handlePayment(shippingAddress, isOnline) {
    // https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173
    // http://localhost:5173
    // const BASE_URL = window.location.origin; 
    const BASE_URL = new URL(import.meta.url).origin;
    const API_URL = isOnline ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${BASE_URL}` : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

      try {
        const {data} = await axios.post(API_URL , {shippingAddress}, {headers});
        // console.log(data);
        if (data.status === 'success') {

          setNumOfCartItems(0);
    
          setCartDetails(null);    
    
          setCartId(null);
        }
       return data;          
      } 
      
      catch (error) {
      
        // console.log(error);
      
        return error;   
      }
    }
    

  return <CartContext.Provider value={{addToCart, numOfCartItems, cartDetails, removeFromCart, updateCartProduct, clearCart, handlePayment, isLoading, setIsLoading}}>
            {children}
  </CartContext.Provider>;
}