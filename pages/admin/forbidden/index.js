import React from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import FormCreateForbiddenNumber from "../../../components/admin/forbidden/formCreateForbiddenNumber";
import ForbiddenTable from "../../../components/admin/forbidden/forbiddenTable";
import ForbiddenBetTable from "../../../components/admin/forbidden/forbiddenBetTable";
import { getLottoCurrent } from '../../../lib/helper';
import { useQuery } from "react-query";
import { getForbiddenByLottoDateId } from "../../../lib/clientRequest/forbidden";

export default function Forbidden() {

  const lottoCurrent = getLottoCurrent();
  const {isError, isLoading, data, error} = useQuery(
    ["getForbiddenByLottoDateId", lottoCurrent._id],
    getForbiddenByLottoDateId
  );

  if (isLoading) return <div>ForBidden is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  if (!data?.length) return <div>Something Wrong</div>
  
  return (
    <Layout title={'เลขอั้น'}>
      {/* form */}
      <FormCreateForbiddenNumber />

      {/* table */}
      <ForbiddenTable forbidden={data}/>

      {/* bet table */}
      <ForbiddenBetTable forbidden={data}/>
    </Layout>
    
  )
}
