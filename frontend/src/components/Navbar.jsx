import React, { useEffect, useState } from 'react';

const Navbar = ({heading}) => {
 const [flat,setFlat] = useState(0);
const [name, setName] = useState("");

useEffect(() => {
  const savedUserJson = localStorage.getItem("user");

  if (savedUserJson) {
    const userObj = JSON.parse(savedUserJson);
    setName(userObj.name);
    setFlat(userObj.flatNo);
    // console.log("Logged-in User Name:", userObj.name); 
  } else {
    console.log("⚠️ No user is logged in.");
  }
}, []);


  return (
    <nav className="fixed top-0 left-[180px] w-[calc(100%-180px)] z-50 bg-white border-b border-slate-300 px-8 py-1">

      <div className="h-10 flex items-center justify-between">

        <div className="text-base font-bold">
          {heading}
        </div>

        <div className="flex items-center gap-4">

          <div className="flex flex-col text-right">
            <span className="text-sm font-medium">
              {name}
            </span>

            <span className="text-xs text-slate-500">
              Flat {flat}
            </span>
          </div>

          <img
            className="h-12 w-12 rounded-full object-cover"
            src="image"
            alt="..."
          />

        </div>

      </div>

    </nav>
  );
};

export default Navbar;