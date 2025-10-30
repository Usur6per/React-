import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Components from './pages/Components'
import Home from './pages/Home'
import Calculator from './pages/Calculator'
import Animation from './pages/Animation'
import ForwardToHome from './pages/ForwardToHome'
import AppLayout from './layouts/AppLayout'
import Todos from './pages/Todos'
import './App.css'

function App() {
  return <BrowserRouter basename='/multipages/'>
    <Routes>
      <Route element={<AppLayout />}>
        <Route path='components' element={<Components />} />
        <Route path='home' element={<Home />} />
        <Route path='calculator' element={<Calculator />} />
        <Route path='animation' element={<Animation />} />
        <Route path='todos' element={<Todos />} />
        <Route path='*' element={<ForwardToHome />} />
      </Route>
    </Routes>
  </BrowserRouter>
}

export default App
