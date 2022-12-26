import React from 'react'
import { useQuery } from 'react-query'
import { getConclusion } from '../../../lib/clientRequest/user'

export default function Conclusion({lottoCurrent, userCurrent}) {
  const win = useQuery(['getConclusion', lottoCurrent._id, userCurrent._id], getConclusion)
  if (win.isLoading) return <div>Win is Loading</div>;
  if (win.isError) return <div>Got Error {error}</div>;
  if (!win.data) return <></>
  console.log(win.data)
  return (
    <div>{win.data._id}</div>
  )
}
