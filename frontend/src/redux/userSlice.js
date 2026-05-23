import { createSlice,current } from "@reduxjs/toolkit";


// ye user ka sara data store karegi
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        currentCity: "",
        currentState: "",
        currentAddress:"",
        shopsInMyCity: null,
        itemsInMyCity: null // ye tab tak null rahega jab tak user ka data load nahi ho jata
         // ye tab tak true rahega jab tak user ka data load nahi ho jata
        
    },
    //reducers isliye bante h taki pata
    //  chale hum kis type ka action dispatch 
    // kar rahe h or uske according state update ho rahi h
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
         setCurrentCity: (state, action) => {
            state.currentCity = action.payload;
        },
        setCurrentState: (state, action) => {
            state.currentState = action.payload;
        },
       
    setCurrentAddress:(state,action)=>{
        state.currentAddress=action.payload;   
    },
    setShopsInMyCity:(state,action)=>{
        state.shopsInMyCity=action.payload;
    },
    setItemsInMyCity:(state,action)=>{
        state.itemsInMyCity=action.payload;
    }


}});
export const { setUserData, setCurrentCity, setCurrentState, setCurrentAddress, 
    setShopsInMyCity, setItemsInMyCity } = userSlice.actions;
export default userSlice.reducer;