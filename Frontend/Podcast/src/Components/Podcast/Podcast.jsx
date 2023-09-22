import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../../assets/images/logo.svg'

export default function Podcast() {
  const [selectLink, setSelectedLink] = useState("project");
  return (
    <div>
      <div className='grid' style={{ gridTemplateColumns: "1fr 4fr" }}>
        <div className='p-4' style={{ backgroundColor: "#f3e8ff", height: "100vh", position: "sticky", top: "-72px" }}>
          <Link className='mt-2' to='/'><div className='h-13 min-w-fit text-4xl font-extrabold break-words flex items-center' style={{ color: "#7E22CE", fontFamily: "Plus Jakarta Sans" }}><img style={{ height: "50px", }} src={logo} />
            LAMA.
          </div></Link>
          <p className='p-2'>Podcast Upload Flow</p>
          <Link to='upload'><div onClick={() => { setSelectedLink("project") }} style={{ backgroundColor: selectLink == "project" ? "#7E22CE" : "inherit", color: selectLink == "project" ? "white" : "inherit", borderRadius: selectLink == "project" ? "25px" : "" }} className='p-2 pl-5 font-semibold text-xl flex'><div style={{ padding: "3px 10px", borderRadius: "15px", backgroundColor: selectLink == "project" ? "black" : "#d9cfe4" }} className='mr-2'>1</div> Projects</div></Link>
          <Link><div style={{minWidth:"305px"}} className='p-2 font-semibold pl-5 text-xl flex'><div style={{ padding: "3px 10px", borderRadius: "15px", backgroundColor: "#d9cfe4" }} className='mr-2'>2</div> Widget Configurations</div></Link>
          <Link><div className='p-2 font-semibold pl-5 text-xl flex'><div style={{ padding: "3px 10px", borderRadius: "15px", backgroundColor: "#d9cfe4" }} className='mr-2'>3</div> Deployment</div></Link>
          <Link><div className='p-2 font-semibold pl-5 text-xl flex'><div style={{ padding: "3px 10px", borderRadius: "15px", backgroundColor: "#d9cfe4" }} className='mr-2'>4</div> Pricing</div></Link>
          <Link to='settings'><div onClick={() => { setSelectedLink("setting") }} style={{ backgroundColor: selectLink == "setting" ? "#7E22CE" : "inherit", color: selectLink == "setting" ? "white" : "inherit", borderRadius: selectLink == "setting" ? "25px" : "", }} className='p-2 pl-5 font-semibold text-xl flex'><div style={{ padding: "3px 3px", borderRadius: "15px", backgroundColor: selectLink == "setting" ? "black" : "#d9cfe4" }} className='mr-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          </div>Settings</div></Link>
        </div>
        <div className='ml-10'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
