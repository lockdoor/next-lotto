import React from 'react'
import Layout from '../../../../components/admin/layoutAdmin';
import { useQuery } from "react-query";
import { getUserBetDetail } from '../../../../lib/clientRequest/user';
import TotalPrice from '../../../../components/admin/user/totalPrice';
import Summarize from '../../../../components/admin/user/summarize';

export default function UserBetWithLottoDateId({query}) {
  // console.log(query.params)

  const [lottoDateId, _id, nickname] = query.params
    const { isLoading, isError, data, error } = useQuery(
    ["getUserBetDetail", lottoDateId, _id ],
    getUserBetDetail
  );

  if (isLoading) return <div>Users is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  // console.log(data)
  return (
    <Layout title={nickname}>
      <TotalPrice data={data}/>
      <Summarize data={data}/>
    </Layout>
  )
}

export const getServerSideProps = async (context) => {
  const { query } = context;
  // console.log('query is ', context.query)
  return { props: { query } };
}
