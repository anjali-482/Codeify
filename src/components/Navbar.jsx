// import React from 'react'
// import { BrainCircuit, Sun } from 'lucide-react';

// const Navbar = () => {
//     return (
//         <>
//             <div className="nav flex items-center justify-between  h-[90px] bg-zinc-900" style={{ padding: "0px 150px" }}>
//                 <div className="logo flex items-center gap-[10px]">
//                     <BrainCircuit size={30} color='#9333ea' />
//                     <span className="text-white text-2xl font-bold ml-2">Codeify</span>
//                 </div>
//                 <div className="icons flex items-center gap-[30px]">
//                     <i className='cursor-pointer transition-all hover:text-[#9333ea]'><Sun/></i>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Navbar



import React from 'react'
import { BrainCircuit, Sun, Moon } from 'lucide-react'; // Import Moon icon too

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <>
      <div className="nav flex items-center justify-between h-[90px] bg-zinc-900" style={{ padding: "0px 150px" }}>
        <div className="logo flex items-center gap-[10px]">
          <BrainCircuit size={30} color='#9333ea' />
          <span className="text-white text-2xl font-bold ml-2">Codeify</span>
        </div>
        <div className="icons flex items-center gap-[30px]">
          {/* Toggle dark/light mode on icon click */}
          <i
            className="cursor-pointer transition-all hover:text-[#9333ea]"
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun /> : <Moon />}
          </i>
        </div>
      </div>
    </>
  )
}

export default Navbar
