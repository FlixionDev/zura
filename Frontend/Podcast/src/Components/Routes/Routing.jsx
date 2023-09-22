import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import Navbar from '../Navbar/Navbar'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Podcast from '../Podcast/Podcast'
import Upload from '../Upload/Upload'
import WidgetConfig from '../WidgetConfig/WidgetConfig'
import Account from '../Account/Account'
import EditPodcast from '../EditPodcast/EditPodcast'
export default function Routing() {
  return (
    <div>
        <Routes>
            <Route path='/' element={<><PrivateRoute><Navbar/><LandingPage/></PrivateRoute></>}/>
            <Route path="/project/:id" element={<><PrivateRoute><Podcast/></PrivateRoute></>}>
              <Route path='upload' element={<><PrivateRoute><Upload/></PrivateRoute></>}/>
              {/* <Route path='widget' element={<WidgetConfig/>}/> */}
              <Route path='settings' element={<><PrivateRoute><Account/></PrivateRoute></>}/>
              <Route path='upload/edit/:id' element={<><PrivateRoute><EditPodcast/></PrivateRoute></>}/>
            </Route>
            <Route path='*' element={<h1>Page, not found</h1>}/>
        </Routes>
    </div>
  )
}
