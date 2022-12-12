import React from "react";

export default function TotalPrice({ data }) {
  return (
    <div className="text-center text-xl text-blue-400">
      ยอดซื้อรวม = {data.reduce((a, b) => a + b.totalPrice, 0)}
    </div>
  )
}
