import React, { useEffect, useState } from 'react'
import userIcon from '../../assets/images/1144760.png'
export default function Account() {
  const [userName, setUSerName] = useState("");
  const [userEmail, setUserEmail] = useState("")
  const [defaultUsername, setDefaultUserName] = useState("")
  const [id, setId] = useState("")
  const [state, setState] = useState(false);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('userData'))
    setUSerName({ username: user.username });
    setId(user._id);
    setDefaultUserName(user.username)
    setUserEmail(user.email)
  }, []);
  const updateUserNameFunc = () => {
    fetch(`https://long-gray-cygnet-shoe.cyclic.cloud/register/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userName),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json()).then((res) => {
      console.log(res)
      if (res.userData) {
        let user=localStorage.setItem("userData", JSON.stringify(res.userData[0]))
        setUSerName({ username: res.userData[0].username });
        setId(res.userData[0]._id);
        setDefaultUserName(res.userData[0].username)
        setUserEmail(res.userData[0].email)
        alert("User Name updated")
      } else {
        alert("Something went wrong")
      }
    }).catch((err) => { console.log(err) })
  }
  return (
    <div>
      <div className='flex justify-end gap-4 p-3 pt-6 pr-6'>
        {
          state ?
            <div className='flex items-center justify-between break-words font-bold'><img className='h-8' src={downarrow} />EN <img className='h-8 w-10' src={flag} /></div>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        }

        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      </div>
      <div style={{ color: "#7E22CE", fontSize: "43.41px", fontWeight: "700", wordBreak: "break-word" }}>Account Settings</div>
      <div className='flex mt-10'>
        <div className='mr-10'><img style={{ backgroundColor: "#f1f3f4" }} className='w-24 rounded-full' src={userIcon} /></div>
        <div className='flex items-center gap-4'>
          <div>
            <label className='block text-2xl font-semibold'>User Name</label>
            <input value={userName.username} className='p-1' onChange={(e) => { setUSerName({ ...userName, username: e.target.value }) }} style={{ border: '1px solid', width: "300px" }} />
          </div>
          <div>
            <label className='block text-2xl font-semibold'>Email</label>
            <input value={userEmail} disabled className='p-1' style={{ border: '1px solid', width: "300px" }} />
          </div>
          <button onClick={updateUserNameFunc} disabled={defaultUsername == userName.username ? true : false} className='rounded mt-8' dls style={{ backgroundColor: defaultUsername == userName.username ? "grey" : "black", fontSize: '14px', color: "white", maxHeight: "33px", padding: "6px 16px" }}>
            Update
          </button >
        </div>
      </div>
      <div className='mt-5' style={{ color: "#7E22CE", fontSize: "40.41px", fontWeight: "700", wordBreak: "break-word" }}>Subscriptions</div>
      <div className='flex items-center justify-between p-10 rounded mb-2' style={{ height: "80px", color: 'white', width: "98%", backgroundColor: "#460281" }}>
        <div><span>You are currently on the &nbsp;</span><span className='underline'> Ques AI Basic Plan!</span></div>
        <div className='rounded p-2' style={{ backgroundColor: "white", fontSize: '18px', color: "#7E22CE" }}>Upgrade</div>
      </div>
      <div className='underline' style={{ color: "red" }}>
        cancel Subscriptions
      </div>

    </div>
  )
}
