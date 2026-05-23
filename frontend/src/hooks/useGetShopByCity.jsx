import  React,{ useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setShopsInMyCity } from "../redux/userSlice.js";
import { useSelector } from "react-redux";

function useGetShopByCity() {

    const  { currentCity } = useSelector((state) => state.user );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      if (!currentCity) return;
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-shops-by-city/${currentCity}`,
          { withCredentials: true }
        );
        dispatch(setShopsInMyCity(result.data));
        console.log(result.data);
      } catch (error) {
        console.log(error);
      } 
    };

    fetchShop();
  }, [currentCity]);

}

export default useGetShopByCity;