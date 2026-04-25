import { createSlice } from "@reduxjs/toolkit";

// ye user ka sara data store karegi
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        state: null,
        isAuthLoading: true, // ye tab tak true rahega jab tak user ka data load nahi ho jata
        
    },
    //reducers isliye bante h taki pata
    //  chale hum kis type ka action dispatch 
    // kar rahe h or uske according state update ho rahi h
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setCity: (state, action) => {
            state.city = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
        },
        setAuthLoading: (state, action) => {
            state.isAuthLoading = action.payload;
        }
    }


})
export const { setUserData, setCity, setState, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;