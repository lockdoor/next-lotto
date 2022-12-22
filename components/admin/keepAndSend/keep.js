import React, {useState} from 'react'
import { AiOutlinePlusSquare } from "react-icons/ai";
import MyModal from '../../myModal';
import ContentPostKeep from './contentPostKeep';
import ContentPutOrDeleteKeep from './contentPutOrDeleteKeep';
import {RiDeleteBin2Line, RiEdit2Line} from "react-icons/ri"


export default function Keep({number, lottoCurrent}) {

  const [showPutOrDeleteKeep, setShowPutOrDeleteKeep] = useState(false)
  const [showPostKeep, setShowPostKeep] = useState(false)
  // console.log(number)
  const onPostKeep = () => {
    if(!lottoCurrent.isOpen){
      alert('หวยงวดนี้ทำการปิดแล้ว')
    }
    else {
      setShowPostKeep(true)
    }
  }

  const onEditKeep = () => {
    if(!lottoCurrent.isOpen){
      alert('หวยงวดนี้ทำการปิดแล้ว')
    }
    else {
      setShowPutOrDeleteKeep(true)
    }
  }
  return (
    <>
      <div className="text-center">
        {
          number.keep.price
            ? <span className=' cursor-pointer' onClick={onEditKeep}>
              {number.keep.price}
              <RiEdit2Line className='inline' />
              </span>
            : <span>
            <AiOutlinePlusSquare 
              className="inline text-green-400 cursor-pointer"
              onClick={onPostKeep}
              />
          </span>
          }
        
        
      </div>
      <MyModal isOpen={showPostKeep} onClose={setShowPostKeep}>
        <ContentPostKeep number={number} setShowModal={setShowPostKeep} lottoCurrent={lottoCurrent}/>
      </MyModal>
      <MyModal isOpen={showPutOrDeleteKeep} onClose={setShowPutOrDeleteKeep}>
        <ContentPutOrDeleteKeep number={number} setShowModal={setShowPutOrDeleteKeep} lottoCurrent={lottoCurrent}/>
      </MyModal>
    </>
  )
}
