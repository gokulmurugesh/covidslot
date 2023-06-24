"use client"
import React, { useState } from 'react'
import Select from 'react-select';

const page = () => {
  const [isCityOpen, setIsCityVisible] = useState(false)
  const [cities, setCities] = useState({})

  const states = [
    { value: 'tamilnadu', label: 'Tamil Nadu' },
    { value: 'kerala', label: 'Kerala' },
  ]

  const city = [
    { value: 'coimbatore', label: 'Coimbatore' },
    { value: 'erode', label: 'Erode' },
    { value: 'chennai', label: 'Chennai' }
  ]


  const find = (e) => {
    setCities()
    setIsCityVisible(true)
  }

  return (
    <main>
      <div>
      <Select options={states} defaultValue="Select" onChange={(e) => find(e)} />
      {isCityOpen && <Select options={city} defaultValue="Select" />}

      </div>
    </main>
  )
}

export default page