import React from 'react'
import { useQuery } from 'react-query'
import { getNumberDetail } from '../../../lib/clientRequest/dashboard'
import { translateType, numberWithCommas } from '../../../lib/helper'

export default function NumberDetail({lottoCurrent}) {
  const {isLoading, isError, error, data} = useQuery(["getNumberDetail", lottoCurrent?._id], getNumberDetail)
  if (isLoading) return <div>Forbidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  // console.log(data)
  return (
    <div className='border-4 border-green-300 rounded-md p-5 my-5 bg-white text-center'>
      <div className='text-dashboard-header1'>อันดับเลขฮิต</div>
      <div className="lg:flex gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 justify-center">

      { data.bet.map(bet => {
        return (
          <div key={bet._id} className="border-2 w-full border-pink-300 p-3 my-3 rounded-md">
            <div className='text-dashboard-header2'>{ translateType(bet._id) }</div>
            <div>{bet.numbers.map(number => (
              <div key={number.numberString}><span>{number.numberString}</span> : <span className="text-blue-600">{ numberWithCommas(number.price) }</span></div>
            ))}</div>
          </div>
        )
      }) }
          </div>

    </div>    
  )
}
