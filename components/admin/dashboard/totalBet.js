import React from 'react'
import { useQuery } from 'react-query'
import { getTotalBet } from '../../../lib/clientRequest/dashboard'
import { numberWithCommas } from '../../../lib/helper'
export default function TotalBet({lottoCurrent}) {
  const {isLoading, isError, error, data} = useQuery(["getTotalBet", lottoCurrent?._id], getTotalBet)
  if (isLoading) return <div>Forbidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  // console.log(data)
  return (
    <div className="border-4 border-green-300 w-full p-5 my-5 rounded-md bg-white text-center">
      <div className='text-dashboard-header1'>ยอดรวมทั้งหมด</div>
      <div className=' md:relative md:translate-y-1/2 text-6xl text-blue-600'>{ numberWithCommas(data?.totalBet) }</div>
    </div>    
  )
}
