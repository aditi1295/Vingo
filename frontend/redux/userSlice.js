import { createSlice } from "@reduxjs/toolkit";

// ye user ka sara data store karegi
const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null

    },
    //reducers isliye bante h taki pata
    //  chale hum kis type ka action dispatch 
    // kar rahe h or uske according state update ho rahi h
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload;
        }

    }

    
})
export  const {setUserData}=userSlice.actions;
export default userSlice.reducer;