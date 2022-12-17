import React, {useState, useEffect} from 'react'
import Layout from '../../../components/admin/layoutAdmin'
import { useQuery } from "react-query";
import { getWinByLottoDateId } from "../../../lib/clientRequest/win";
import MyModal from "../../../components/myModal"
import ContentModalPost from "../../../components/admin/win/contentModalPost"
import WinTable from "../../../components/admin/win/winTable";
import WinnerTable from "../../../components/admin/win/winnerTable";

export default function Win() {
  const [showModalPost, setShowModalPost] = useState(false)
  const type = ['up3', 'set3up', 'down3','up2', 'down2', 'uprun', 'downrun']
  const [lottoCurrent, setLottoCurrent] = useState(null)
  useEffect(()=>{
    setLottoCurrent(JSON.parse(localStorage.getItem('lottoCurrent')))
  },[])
  const { isLoading, isError, data, error } = useQuery(
    ["getWinByLottoDateId", lottoCurrent?._id],
    getWinByLottoDateId
  )

  if (isLoading) return <div>Win is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;
  return (
    <Layout title={'ตรวจหวย'}>
     {data === null ? (
        <div onClick={()=>setShowModalPost(true)}
          className="text-center my-5 cursor-pointer">
          คลิกที่นี่เพื่อเพิ่มเลขที่ออก
        </div>
      ) : (
        <div className="container mx-auto">
          <WinTable data={data}/>
          {
            type.map(e => (
              <WinnerTable type={e} win={data} key={e}/>
            ))
          }
        </div>
      )}
      <MyModal isOpen={showModalPost} onClose={setShowModalPost}>
        <ContentModalPost onClose={setShowModalPost}/>
      </MyModal>
    </Layout>
    
  )
}
