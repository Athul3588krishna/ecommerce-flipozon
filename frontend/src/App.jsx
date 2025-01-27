import React from 'react'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'

import { Routes,Route } from 'react-router-dom'

const App=()=> {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>


      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/collection' element={<Collection/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>

      </Routes>
    </div>
  )
}

export default App