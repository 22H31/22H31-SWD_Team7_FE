import React from 'react'
import {SSpin} from '../../globalVariable/spin'
import { Spin } from 'antd';
export default function SpinAll() {
    const isSPin = SSpin.use();
  return (
    isSPin ? <Spin fullscreen style={{width:"100%"}}/> : <></>
  )
}
