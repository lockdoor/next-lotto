import React from 'react'
import Layout from '../../components/user/layoutUser'
import { useSession } from "next-auth/react";


export default function UserPage() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <Layout title={session?.token.nickname}>
      <div>UserPage</div>
      <Card bgColor='bg-indigo-300' title={'เครดิต'} data={session?.token.credit}/>
      <Card bgColor='bg-emerald-400' title='ยอดซื้อ' />
    </Layout>
    
  )
}

const Card = ({bgColor, data, title}) => {
  return (
    <div className={`${bgColor} `}>
      <div>{title}</div>
      <div>{data}</div>
    </div>
  )
}
