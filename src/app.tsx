import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './components/navbar'

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
