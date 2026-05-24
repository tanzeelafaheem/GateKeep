import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
 const name='Tanzeela';
 const [flat,setFalt]=useState(102);
  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-slate-300">
  
  
  <div className="max-w-6xl my-2 py-4 px-4 h-10 flex items-center justify-between">
    
    <div className="text-base font-bold">DashBoard</div>
    
    <div className=" flex items-center gap-4">
        <div className='flex flex-col'>
      <a href="#" className="hover:text-indigo-400 transition text-sm">{name}</a>
      <a href="#" className="hover:text-indigo-400 transition text-xs">{flat}</a>
      </div>
       <img  className='h-12 w-12 rounded-full' src="image" alt="T" />
    </div>

  </div>
</nav>

  )
}

export default Navbar
