import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch, useSelector } from "react-redux";
import {setMyShopData } from "../redux/ownerSlice.js";

function useGetMyShop() {

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    if (!userData || userData.role !== "owner") {
      dispatch(setMyShopData(null));
      return;
    }

    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/shop/get-shop`,
          { withCredentials: true }
        );
        dispatch(setMyShopData(result.data));
      } catch (error) {
        if (error?.response?.status !== 404) {
          console.log(error);
        }
        dispatch(setMyShopData(null));
      }
    };

    fetchShop();
  }, [dispatch, userData]);

}

export default useGetMyShop;
