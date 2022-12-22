import React, {useEffect} from 'react'
import Layout from '../../../../components/admin/layoutAdmin';
import { useQuery } from "react-query";
import { getUserBetDetail } from '../../../../lib/clientRequest/user';
import TotalPrice from '../../../../components/admin/user/totalPrice';
import Summarize from '../../../../components/admin/user/summarize';
import connectDB from '../../../../database/connectDB';
import Lotto from '../../../../model/lotto';
import User from '../../../../model/user'
import { useRouter } from 'next/router';
import { dateToInputValue } from '../../../../lib/helper';
import mongoose from 'mongoose';

export default function UserBetWithLottoDateId({lotto, user}) {

  const lottoCurrent = JSON.parse(lotto) 
  const userCurrent = JSON.parse(user) 
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/user/betDetail/${dateToInputValue(lottoCurrent.date)}/${userCurrent.nickname}`, undefined , {shallow: true})
  }, [])
  const { isLoading, isError, data, error } = useQuery(
    ["getUserBetDetail", lottoCurrent._id, userCurrent._id ],
    getUserBetDetail
  );

  if (isLoading) return <div>Users is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <Layout title={userCurrent.nickname} lottoCurrent={lottoCurrent}>
      <TotalPrice data={data}/>
      <Summarize data={data}/>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  let [lottoDateId, userId] = context.query.params
  const lottoFilter = Date.parse(lottoDateId)
  ? {date: lottoDateId}
  : {_id: lottoDateId}
  const userFilter = mongoose.Types.ObjectId.isValid(userId)
  ? {_id: userId}
  : {nickname: userId}
  try{
    await connectDB()
    const lotto = await Lotto.findOne(lottoFilter)
    const user = await User.findOne(userFilter)
    return {
      props: {
        lotto: JSON.stringify(lotto),
        user: JSON.stringify(user)
      }
    }
  }catch(error){
    console.log(error)
    return {
      redirect: {
        permanent: false,
        destination: '/404'
      },
      props: {}
    }
  }
}
