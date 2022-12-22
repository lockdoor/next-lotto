import React, { useState, useEffect } from "react";
import Layout from "../../../components/admin/layoutAdmin";
import { useQuery } from "react-query";
import { getWinByLottoDateId } from "../../../lib/clientRequest/win";
import MyModal from "../../../components/myModal";
import ContentModalPost from "../../../components/admin/win/contentModalPost";
import WinTable from "../../../components/admin/win/winTable";
import WinnerTable from "../../../components/admin/win/winnerTable";
import getLottoCurrent from "../../../lib/getLottoCurrent";
import { useRouter } from "next/router";
import { dateToInputValue } from "../../../lib/helper";

export default function Win({lottoCurrent}) {

  const lotto = JSON.parse(lottoCurrent)
  const router = useRouter()
  useEffect(() => {
    router.push(`/admin/win/${dateToInputValue(lotto.date)}`, undefined , {shallow: true})
  }, [])

  const [showModalPost, setShowModalPost] = useState(false);
  
  const { isLoading, isError, data, error } = useQuery(
    ["getWinByLottoDateId", lotto._id],
    getWinByLottoDateId
  );

  if (isLoading) return <div>Win is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  console.log(data)
  return (
    <Layout title={"ตรวจหวย"} lottoCurrent={lotto}>
      {!data ? (
        <div
          id='add-win'
          onClick={() => setShowModalPost(true)}
          className="text-center my-5 cursor-pointer"
        >
          คลิกที่นี่เพื่อเพิ่มเลขที่ออก
        </div>
      ) : (
        <div className="container mx-auto">
          <WinTable data={data} />

          <WinnerTable lottoCurrent={lotto} />
        </div>
      )}
      <MyModal isOpen={showModalPost} setShowModal={setShowModalPost}>
        <ContentModalPost setShowModal={setShowModalPost}  lottoCurrent={lotto} />
      </MyModal>
    </Layout>
  );
}

export const getServerSideProps = async (context) => getLottoCurrent(context)
