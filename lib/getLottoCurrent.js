import connectDB from "../database/connectDB";
import Lotto from "../model/lotto";

export default async function getLottoCurrent(context){ 
  // console.log('query is ', context.query)
  const { lottoDateId } = context.query;
  const filter = Date.parse(lottoDateId)
    ? {date: lottoDateId}
    : {_id: lottoDateId}
  try{
    await connectDB()
    const lotto = await Lotto.findOne(filter).select('date')
    // console.log(lotto)
    return {props: {lottoCurrent: JSON.stringify(lotto) }}  
  }
  catch(error){
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