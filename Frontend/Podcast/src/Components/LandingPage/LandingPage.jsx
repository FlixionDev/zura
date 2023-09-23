import React, { useEffect } from 'react'
import podimg from '../../assets/images/podimg.png'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import plusIcon from '../../assets/images/plusIcon.svg'
import homeIcon from '../../assets/images/home.svg'
import {Link} from 'react-router-dom'
import style from './LandingPage.module.css'
export default function LandingPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [projectName, setProjectName] = useState({ projectName: "" });
    const [allProject, setAllProject] = useState([]);
    const color=["#7E22CE","#F8A01D","#6366F1"]
    useEffect(() => {
        fetchAllProjectFromDb();
    }, [])
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const fetchAllProjectFromDb = () => {
        fetch(`https://long-gray-cygnet-shoe.cyclic.cloud/project/`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        }).then(res => res.json()).then((res) => {
            if(res.message){
                setAllProject([])
            }else{
                setAllProject(res.allProject);
            }
        }).catch((err) => { console.log(err) })
    }
    const createProjectFunc = () => {
        fetch(`https://long-gray-cygnet-shoe.cyclic.cloud/project/`, {
            method: "POST",
            body: JSON.stringify(projectName),
            headers: {
                "Authorization": localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then((res) => {
            alert(res.message)
            closeModal()
            fetchAllProjectFromDb();
        }).catch((err) => { console.log(err) })
    }
    return (
        <div>
            {
                allProject.length === 0 ?
                    <>
                        <button style={{ boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.06)", borderRadius: "35.32px", border: "0.75px #999999 solid" }} className='flex items-center px-2 relative left-40'><img src={homeIcon} />Back to Home</button>
                        <div className='text-center text-4.5xl' style={{ color: "#7E22CE", fontSize: "43.41px", fontFamily: "Roboto", fontWeight: "700", wordBreak: "break-word" }}>Create a New Project</div>
                        <img className='m-auto w-2/5 h-2/5' src={podimg} />
                        <div className='text-2xl font-normal break-words w-10/12 m-auto text-center' style={{ color: "#838383" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</div>
                        <button style={{ backgroundColor: "black", color: "white" }} onClick={openModal} className='flex m-auto p-2 text-xl items-center gap-1 rounded mt-3'><img className='w-8' src={plusIcon} />Create New Project</button>
                    </>
                    :
                    <>
                        <div className='flex w-4/5 m-auto justify-between'>
                            <div style={{ color: "#7E22CE", fontSize: "43.41px", fontWeight: "700", wordBreak: "break-word" }}>Projects</div>
                            <button style={{ backgroundColor: "black", color: "white" }} onClick={openModal} className='flex p-2 text-xl items-center gap-1 rounded mt-3'><img className='w-8' src={plusIcon} />Create New Project</button>
                        </div>
                    </>
            }
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
                                            <h2 className='font-bold ml-2 text-2xl'>Create Project</h2>
                                            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-sm">
                                                <form className="space-y-6" >
                                                    <div>
                                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-lg mt-3">
                                                            Enter Project Name:
                                                        </label>
                                                        <div className="mt-2">
                                                            <input
                                                                id="email"
                                                                name="email"
                                                                type="email"
                                                                autoComplete="email"
                                                                placeholder='Type here'
                                                                required
                                                                onChange={(e) => { setProjectName({ ...projectName, projectName: e.target.value }) }}
                                                                className="block w-full rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 h-11"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                                <div className='flex justify-end'>
                                                    <button
                                                        onClick={closeModal}
                                                        className="flex rounded-md mt-2 px-3 py-1.5 font-semibold leading-6 text-lg shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        style={{ backgroundColor: "transparent", color: "red", cursor: "pointer" }}
                                                    >
                                                        cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        onClick={createProjectFunc}
                                                        disabled={projectName.projectName.length == 0 ? true : false}
                                                        className="flex justify-center rounded-md mt-2 px-3 py-1.5 text-sm text-lg font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                        style={{ backgroundColor: projectName.projectName.length === 0 ? "grey" : "#7E22CE", cursor: projectName.projectName.length === 0 ? "no-drop" : "pointer" }}
                                                    >
                                                        Create
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
            <div className='w-4/5 m-auto grid grid-cols-3 gap-10 mt-8'>
                {
                    allProject.map((el, ind) => {
                        return <Link key={ind + 1} to={`/project/${el._id}/upload`}><div className='flex rounded-md p-2.5' style={{ boxShadow:" rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
                            <div style={{color:"white",backgroundColor:color[ind%3],minWidth:"160px",height:"160px"}}  className={`rounded-md flex items-center justify-center overflow-hidden text-7xl w-40 h-40`}>{el.projectName.match(/\b(\w)/g).join('').toUpperCase().slice(0, 2)}</div>
                            <p className={`m-auto mt-0.5 text-center  ${style.title}`}>{el.projectName}</p>
                        </div></Link>
                    })
                }
            </div>

        </div>
    )
}
