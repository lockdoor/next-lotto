import React, { useState } from "react";
import { getLottos } from "../../../lib/clientRequest/lotto";
import { useQuery } from "react-query";
import { formatDate } from "../../../lib/helper";
import { MdDeleteForever, MdOutlineEdit } from "react-icons/md";
import { useRouter } from "next/router";
import MyModal from "../../myModal";
import ContentModalLottoEdit from "./contentModalLottoEdit";
import ContentModalLottoDelete from "./contentModalLottoDelete";

export default function LottoTable() {
  const { isLoading, isError, data, error } = useQuery("getLottos", getLottos);

  if (isLoading) return <div>Lottos is Loading</div>;
  if (isError) return <div>Got Error {error}</div>;

  return (
    <div className=" grid md:grid-cols-2 xl:grid-cols-3 gap-2 mt-5 px-5">
      {data?.length &&
        data.map(e => {
          return <Card data={e} key={e._id} />;
        })}
    </div>
  );
}

function Card({ data }) {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false)
  const router = useRouter()

  
  const editHandler = () => {
    setShowModalEdit(true);
  };

  const deleteHandler = () => {
    setShowModalDelete(true)
  }

  const selectLottoDate = () => {
    localStorage.setItem('lottoCurrent', JSON.stringify(data))
    router.replace('/admin/dashboard')
  }

  return (
    <div className=" border-2 border-pink-300 p-10 rounded-md">
      <div className="flex items-center justify-between">
        <p 
          onClick={selectLottoDate} 
          className=" cursor-pointer">
          {formatDate(data.date)}
        </p>
        <div className="flex">
          {/* ปิดการลบหวยไว้ ก่อนลบต้องมีการตรวจสอบอีกหลายอย่าง */}
          <MdDeleteForever
            className="mx-2 text-3xl text-red-600"
            onClick={deleteHandler}
          />
          <MdOutlineEdit
            className="mx-2 text-3xl text-purple-600"
            onClick={editHandler}
          />
        </div>
      </div>

      <MyModal isOpen={showModalEdit} setShowModal={setShowModalEdit}>
        <ContentModalLottoEdit data={data} setShowModal={setShowModalEdit}/>
      </MyModal>

      <MyModal isOpen={showModalDelete} setShowModal={setShowModalDelete}>
        <ContentModalLottoDelete data={data} setShowModal={setShowModalDelete}/>
      </MyModal>

    </div>
  );
}