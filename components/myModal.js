import React, { useRef } from "react";
import {useOutsideAlerter} from '../lib/helper'

export default function MyModal({ isOpen, setShowModal, children }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowModal);

  return (
    <>
      {isOpen ? (
        <div className=" fixed top-0 left-0 bg-slate-400 bg-opacity-50 w-full h-screen">
          <div
            ref={wrapperRef}
            className=" fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-green-400 py-3 px-5 rounded-md bg-gray-50 opacity-100 w-11/12 md:w-2/3"
          >
            {children}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
