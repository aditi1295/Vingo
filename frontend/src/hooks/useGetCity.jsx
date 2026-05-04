import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCity } from "../redux/userSlice.js";
import { setState } from "../redux/userSlice.js";


function useGetCity() {
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);
  const apikey = import.meta.env.VITE_GEOAPIKEY;
  useEffect(() => {
    if (!userData) return;
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const result = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apikey}`);
          dispatch(setCity(result?.data?.results?.[0]?.city));
          dispatch(setState(result?.data?.results?.[0]?.state));
        } catch (err) {
          console.warn("Reverse geocoding failed:", err);
        }
      },
      (err) => {
        console.warn("Geolocation error:", err.code, err.message);
      }
    )

  }, [userData])


}

export default useGetCity;