import React from 'react'
import Navbar from './components/navbar'
import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <Navbar></Navbar>
      <div id="content">
        <Outlet />
      </div>
    </div>
  )
}
