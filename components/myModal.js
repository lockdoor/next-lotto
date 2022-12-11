import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, setShow) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setShow(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

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
