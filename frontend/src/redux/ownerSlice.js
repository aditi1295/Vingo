import { createSlice } from "@reduxjs/toolkit";

// ye user ka sara data store karegi
const ownerSlice = createSlice({
    name: "owner",
    initialState: {
        myShopData: null,
        
        
    },
    //reducers isliye bante h taki pata
    //  chale hum kis type ka action dispatch 
    // kar rahe h or uske according state update ho rahi h
    reducers: {
        setMyShopData: (state, action) => {
            state.myShopData = action.payload;
        }
    }


})
export const { setMyShopData } = ownerSlice.actions;
export default ownerSlice.reducer;