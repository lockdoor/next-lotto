import React from 'react'

export default function NullData({title}) {
  return (
    <div className="w-full border-4 border-green-300 rounded-md p-5 my-5 bg-white text-center">
        <div className="text-dashboard-header1">{title}</div>
        <div>ยังไม่พบรายการ</div>
      </div>
  )
}
