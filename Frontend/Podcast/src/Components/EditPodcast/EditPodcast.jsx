import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import  './EditPodcast.css'
import { useLocation } from 'react-router-dom';
export default function EditPodcast() {
    useEffect(() => {
        fetchPodcastFromServer();
    }, [])
    const nav=useNavigate();
    const { id } = useParams()
    const location = useLocation()
    let pathArr = location.pathname.split("/")


    const [state, setState] = useState(false);
    const title = document.getElementById("title");
    const [editing, setEditing] = useState(false);
    var description = document.getElementById("description");
    const [podcast, setPodcast] = useState({});
    const [defaultPod, setDefaultPod] = useState({});
    const fetchPodcastFromServer = () => {
        fetch(`http://localhost:4000/podcast/podcast/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json()).then((res) => {
            //console.log(res)
            if (res.message == 'No podcast found') {
                setPodcast({})
            } else {
                setPodcast(res[0]);
                setDefaultPod(res[0]);
            }
        }).catch((err) => { console.log(err) })
    }
    const updatePodcastFunc = () => {
        let data = {
            title: podcast.title,
            description: podcast.description
        }
        fetch(`http://localhost:4000/podcast/edit/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json()).then((res) => {
            alert(res.message)
            fetchPodcastFromServer();
            nav(`/${pathArr[1]}/${pathArr[2]}/${pathArr[3]}`)
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
            <div className='flex items-center justify-between pr-6'>
                <div style={{ color: "#7E22CE", fontSize: "43.41px", fontWeight: "700", wordBreak: "break-word" }}>Edit Transcript</div>
                {
                    editing ?
                        <div className=''>
                            <button className='p-2 rounded mr-4' id='end-editing' style={{ border: "1px solid red", color: "red" }} onClick={() => {
                                setEditing(false);

                            }}>discard</button>
                            <button onClick={updatePodcastFunc} className='p-2 rounded' style={{ backgroundColor: "black", color: "white" }}>Save and Exit</button>
                        </div> : ""
                }

            </div>
            <div className='mt-5 p-2' style={{ height: "550px", border: "1px solid #7E22CE", width: "98%", maxWidth: "1110px", overflow: "hidden", overflowY: "auto" }}>
                <div className=''>
                    <button id='edit' onClick={() => {
                        setEditing(true);
                    }} style={{ border: "1px solid", color: "white", backgroundColor: "#3c3c3c" }} className='flex px-4 py-2 rounded-full'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        Edit Mode</button>
                </div>
                <div className='mt-5'>
                    {
                        podcast ?
                            <>
                                <label className='text-xl'>Title : </label>
                                <input className='text-2xl' disabled={editing ? false : true} style={{ width: "90%", color: '#7E22CE' }} onChange={(e) => { setPodcast({ ...podcast, title: e.target.value }) }} value={podcast.title} />
                                <br />
                                <label className=' text-xl mt-2'>Description :- </label>
                                <input className='text-xl' type='text' disabled={editing ? false : true} style={{ width: "85%", }} onChange={(e) => { setPodcast({ ...podcast, description: e.target.value }) }} value={podcast.description} />
                                <div style={{ height: "400px", width: "98%", maxWidth: "1110px", overflow: "hidden", overflowY: "auto" }}>

                                    {podcast.description}
                                </div>

                            </>
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}
