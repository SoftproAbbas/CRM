import React from 'react'
import Chpass from '../Component/Chpass'

function CounChpass() {
  return (
     <>
    <Chpass  id={localStorage.getItem('Counselor')} role="Counselor"/>
     </>
  )
}

export default CounChpass