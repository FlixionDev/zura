import React, { useEffect } from 'react'
import yticon from '../../assets/images/yticon.svg'
import spotifyIcon from '../../assets/images/spotify.svg'
import uploadIcon from '../../assets/images/upload.svg'
import { Dialog, Transition } from '@headlessui/react'
import crossIcon from '../../assets/images/cross.svg'
import { Fragment, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
export default function Upload() {
    useEffect(() => {
        fetchAllPodcastFromDb();
    }, [])
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState(false);

    const { id } = useParams();
    const [pod, setPod] = useState({ title: "", description: "" });
    const [allPodcast, setAllPodcast] = useState([]);
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const uploadPodcastFunc = () => {
        fetch(`https://long-gray-cygnet-shoe.cyclic.cloud/podcast/add/${id}`, {
            method: "POST",
            body: JSON.stringify(pod),
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((res) => {
            alert(res.message)
            closeModal()
            setPod({ title: "", description: "" })
            fetchAllPodcastFromDb();
        }).catch((err) => { console.log(err) })
    }
    const fetchAllPodcastFromDb = () => {
        fetch(`https://long-gray-cygnet-shoe.cyclic.cloud/podcast/${id}`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json()).then((res) => {
            // console.log(res)
            if(res.message=='No podcast found'){
                setAllPodcast([])
            }else{
                setAllPodcast(res)
            }
        }).catch((err) => { console.log(err) })
    }
    const deletePodcastFunc=(podId)=>{
        fetch(`https://long-gray-cygnet-shoe.cyclic.cloud/podcast/delete/${podId}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((res) => {
            alert(res.message)
            fetchAllPodcastFromDb();
        }).catch((err) => { console.log(err) })
    }
    return (
        <div>
            <div className='flex justify-end gap-4 p-3 pt-6 pr-6'>
                    {
                        state ?
                            <div className='flex items-center justify-between break-words font-bold'><img className='h-8' src={downarrow}/>EN <img className='h-8 w-10' src={flag}/></div>
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
            <div>
                <div style={{ color: "#7E22CE", fontSize: "43.41px", fontWeight: "700", wordBreak: "break-word" }}>Upload</div>
                <div className='w-4/5 grid grid-cols-3 gap-10 mt-8'>
                    <div onClick={openModal} className='flex rounded-md p-2.5 text-lg font-bold justify-around cursor-pointer' style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}><img className='w-16 h-16' src={yticon} alt="YoutubeIcon" /> Upload <br /> Youtube Video</div>
                    <div className='flex rounded-md p-2.5 text-lg font-bold justify-around cursor-pointer' style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}><img className='w-16 h-16' src={spotifyIcon} alt="Spotify Icon" /> Upload <br /> Spotify Podcast</div>
                    <div className='flex rounded-md p-2.5 text-lg font-bold justify-around cursor-pointer' style={{ boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}><img className='w-16 h-16' src={uploadIcon} alt="upload icon" /> Upload Media <br /> to Text File</div>
                </div>
            </div>
            <>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={close}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <div className="mt-2">
                                            <div className='flex rounded-md p-2.5 text-xl font-bold items-center justify-between' ><div className='flex items-center'><img className='w-10 h-10 mr-5' src={yticon} alt="YoutubeIcon" /> Upload Youtube Video</div> <img className='w-8 h-8 cursor-pointer' onClick={closeModal} src={crossIcon} /></div>
                                            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                                                <form className="space-y-6" >
                                                    <div>
                                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 text-lg mt-3">
                                                            Title :
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="title"
                                                                name="title"
                                                                type="title"
                                                                autoComplete="title"
                                                                placeholder='Enter title'
                                                                required
                                                                value={pod.title}
                                                                onChange={(e) => { setPod({ ...pod, title: e.target.value }) }}
                                                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-11"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="Description" className="block text-sm font-medium leading-6 text-gray-900 text-lg mt-2">
                                                            Description :
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="Description"
                                                                name="Description"
                                                                type="Description"
                                                                autoComplete="Description"
                                                                placeholder='Enter Description'
                                                                required
                                                                value={pod.description}
                                                                onChange={(e) => { setPod({ ...pod, description: e.target.value }) }}
                                                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-11"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className='flex justify-end'>
                                                    <button
                                                        type="submit"
                                                        onClick={uploadPodcastFunc}
                                                        disabled={pod.title.length == 0 || pod.description.length == 0 ? true : false}
                                                        className="flex justify-center rounded-md mt-2 px-3 py-1.5 text-sm text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        style={{ backgroundColor: pod.title.length == 0 || pod.description.length == 0 ? "grey" : "black", cursor: pod.title.length == 0 || pod.description.length == 0 ? "no-drop" : "pointer" }}
                                                    >
                                                        Upload
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
            {
                allPodcast.length > 0 ?
            <div className="flex flex-col mt-10" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",width:"96%" }}>
                <div className=" sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden" style={{height:"400px",overflowY:"auto"}}>
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="border-b font-medium dark:border-neutral-500">
                                    <tr>
                                        <th scope="col" className="px-6 py-4">Title</th>
                                        <th scope="col" className="px-6 py-4">Description</th>
                                        <th scope="col" className="px-6 py-4">Status</th>
                                        <th scope="col" className="px-6 py-4">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        allPodcast.map((el, ind) => {
                                            return <tr key={ind + 1} className="border-b dark:border-neutral-500">
                                                <td className="whitespace-nowrap px-6 py-4" style={{maxWidth:"150px",overflow:"hidden"}}>{el.title}</td>
                                                <td className="whitespace-nowrap px-6 py-4" style={{maxWidth:"300px",overflow:"hidden"}}>{el.description}</td>
                                                <td className="whitespace-nowrap px-6 py-4">Done</td>
                                                <td className='flex mt-1 cursor-pointer'><Link to={`edit/${el._id}`}><div className=' p-2 text-center' style={{border :"1px solid #999999",color:"black",fontWeight:"bold"}}>Edit</div></Link>&nbsp;<div className=' p-2 text-center cursor-pointer' style={{border :"1px solid #999999",color:"red",fontWeight:"bold"}} onClick={()=>{deletePodcastFunc(el._id)}}>Delete</div></td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            : <div style={{width:"99%"}} className='mt-5'>
                <div style={{color:"#999999"}} className='text-center mb-5'>or</div>
                <div style={{color:"#999999"}} className='outline-dotted p-3'>
                <img className='m-auto' src={uploadIcon} alt="upload" />
                <div style={{color:"black"}} className='text-center'>Select a file or drag and drop here (Podcast Media or Transcription Text)</div>
                <div className='text-center'>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </div>
                <div className='w-32 rounded-full m-auto text-center p-3 mt-2' style={{color:'#7E22CE',border:"1px solid #7E22CE"}}>Select File</div>
                </div>
            </div>

            }
        </div>
    )
}
