import React, { useState } from 'react'

export default function Advice() {

  const [showAdvice, setShowAdvice] = useState(false)


  return (
    <div className='px-5'>
      <p className='text-sm text-blue-400 cursor-pointer'
        onClick={()=>setShowAdvice(!showAdvice)}
      >
        {showAdvice ? "ซ่อนวิธีคีย์" : "แสดงวิธีคีย์"}
      </p>
      {showAdvice && <ol className='list-decimal'>
        <li>เลือกลูกค้าจากช่องเลือกลูกค้า หากไม่พบลูกค้า ให้คลิกสร้างลูกค้าใหม่</li>
        <li>เลือกประเภทของหวย</li>
        <li>ใส่ตัวเลข</li>
        <li>กรณี 2ตัว ถ้าแทงบน หรือ ล่าง แล้วแทงกลับ ระบบจะกลับตัวเลขให้อัตโนมัติ</li>
        <li>กรณี 3ตัว ถ้าแทงบน แล้วแทงโต๊ด ระบบจะแทงให้อัตโนมัติ</li>
        <li>การแก้ไขทำได้เฉพาะตัวเลขและราคาเท่านั้น</li>
        <li>กรณีแทง3ตัวโต๊ด จะเป็นโต๊ด 3ตัวบนเท่านั้น และระบบจะบันทึกเลขจากน้อยไปมาก </li>
      </ol>}
    </div>
  )
}
