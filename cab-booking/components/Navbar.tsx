import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Navbar() {
    return (
        <div className='flex justify-between p-3 px-10 border-b-[1px] shadow-sn'>
            <div className='flex gap-10 items-center'>
                <img src={"/taxiLogo.png"} alt='logo' width={30} height={15} />
                <div className='hidden md:flex gap-6'>
                    <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Home</h2>
                    <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-all'>Ride History</h2>
                    <h2 className='hover:bg-gray-100 p-2 rounded-md cursor-pointer transition-al'>Help</h2>
                </div>
            </div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default Navbar
