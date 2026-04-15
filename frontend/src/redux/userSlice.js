import { createSlice } from "@reduxjs/toolkit";

// ye user ka sara data store karegi
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        city: null,
        authLoading: true,
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
        setAuthLoading: (state, action) => {
            state.authLoading = action.payload;
        },
    }


})
export const { setUserData, setCity, setAuthLoading } = userSlice.actions;
export default userSlice.reducer;