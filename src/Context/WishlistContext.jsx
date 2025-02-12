import { createContext, useEffect, useState } from "react";
import { AuthContext } from './AuthContext';
import { useContext } from "react";
import axios from "axios";

export const WishlistContext = createContext(null);

export default function WishlistContextProvider({children}) {

    const [wishlist, setWishList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const {token} = useContext(AuthContext);

    const headers = {token};

    useEffect(() => {
      token && getWishList();
    }, [token])
    

    const API_URL = "https://ecommerce.routemisr.com/api/v1/wishlist";

    async function addToWishlist(productId) {
        setIsLoading(true);
        try {
        const {data} = await axios.post(API_URL, {productId}, {headers})
        if (data.status === 'success') {
            await getWishList();
            }
        return data;
        } catch (error) {
            return error;
        }
        finally{
            setIsLoading(false);
        }
    }

    async function getWishList() {
        setIsLoading(true);          
        try {
        const {data} = await axios.get(API_URL, {headers})
        if (data.status === "success"){
            // console.log(data);
            setWishList(data.data);
        }
        return data;
        } catch (error) {
            // console.log(error);
            return error;
        }
        finally{
            setIsLoading(false);
          }
    }

    async function removeFromWishlist(productId) {
        setIsLoading(true);
        try {
      const {data} = await axios.delete(`${API_URL}/${productId}`, {headers})
            // console.log(data);
            
            if (data.status === 'success') {
                setWishList(wishlist.filter((item)=> item.id !== productId))
            }
            return data;
        } catch (error) {
            // console.log(error);
        }
        finally{
            setIsLoading(false);
        }
    }


    return <WishlistContext.Provider value={{wishlist, isLoading, setIsLoading, addToWishlist, removeFromWishlist}}>
        {children}
    </WishlistContext.Provider>;
}