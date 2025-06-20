import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
  <div>
    <Navbar/>
    <main>
      <Outlet/>
    </main>
    <Footer/>
  </div>
  )
}