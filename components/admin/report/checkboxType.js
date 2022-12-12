import React from 'react'
import { translateType } from '../../../lib/helper'

export default function CheckboxType({type, checked, setChecked}) {
  return (
    <label htmlFor={type} className=" cursor-pointer inline-block">
          <input
            type={"checkbox"}
            id={type}
            className=" cursor-pointer mr-1"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          {translateType(type)}
        </label>
  )
}
