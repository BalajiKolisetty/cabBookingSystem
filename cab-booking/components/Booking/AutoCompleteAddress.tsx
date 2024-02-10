"use client"
import React, { useEffect, useState } from 'react'

const session_token = ""
const MAP_BOX_RETRIEVE_URL = "https://api.mapbox.com/search/searchbox/v1/retrieve";

function AutoCompleteAddress() {
    const [source, setSource] = useState<any>();
    const [destination, setDestination] = useState<any>();
    const [sourceChange, setSourceChange] = useState<any>(false);
    const [destinationChange, setDestinationChange] = useState<any>(false);
    const [addressList, setAddressList] = useState<any>([]);

    useEffect(() => {
        const delayBouncedFunction = setTimeout(() => {
            getAddressList()
        }, 1000);
        return () => clearTimeout(delayBouncedFunction);
    }, [source, destination]);

    const getAddressList = async () => {
        setAddressList([]);
        const query = sourceChange ? source : destination;
        const res = await fetch("/api/search-address?q=" + query, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const result = await res.json();
        setAddressList(result);
    }
    
    return (
        <div>
            <div className='relative'>
                <label className='text-gray-400 text-[13px]'>Where from?</label>
                <input type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none text-[14px] focus:border-yellow-200' value={source} onChange={(e) => { setSource(e.target.value); setSourceChange(true) }} />

                {addressList?.suggestions && sourceChange ?
                    <div className='shadow-md p-1 rounded-md absolute w-full bg-white z-20'>
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer' onClick={() => { setSource(item.full_address); setAddressList([]); setSourceChange(false) }}>{item.full_address}</h2>
                        ))}
                    </div> : null}
            </div>

            <div className='relative'>
                <label className='text-gray-400 text-[13px]'>Where to?</label>
                <input type='text' className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-200 text=[14px]' value={destination} onChange={(e) => { setDestination(e.target.value); setDestinationChange(true) }} />

                {addressList?.suggestions && destinationChange ?
                    <div>
                        {addressList?.suggestions.map((item: any, index: number) => (
                            <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer' onClick={() => { setDestination(item.full_address); setAddressList([]); setDestinationChange(false) }}>{item.full_address}</h2>
                        ))}
                    </div> : null}
            </div>
        </div>
    )
}
export default AutoCompleteAddress
