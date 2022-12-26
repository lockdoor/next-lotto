import React from 'react'

export default function InputNumber({label, value, setValue }) {
  return (
    <div className='my-3 flex'>
      <label className='flex-1 text-start'>{label}</label>
      <input 
        className='flex-1 border border-green-300 rounded-md w-16 text-center p-1'
        type="number"
        value={value}
        onChange={e => setValue(e.target.value)}
        required
      />
    </div>
  )
}


