import React from 'react';
import { useSelector } from 'react-redux';

function Home() {
    const {userData} = useSelector((state)=>state.user);
    return ( 
        <div className='w-[100vh] min-h-screen pt-24 flex flex-col items-center
        bg-[#fff9f6]'>
            {userData.role=='user' && <UserDashboard/>}
            {userData.role=='owner' && <OwnerDashboard/>}
            {userData.role=='deliveryBoy' && <DilveryBoyDashboard/>}

        </div>
     );
}

export default Home;