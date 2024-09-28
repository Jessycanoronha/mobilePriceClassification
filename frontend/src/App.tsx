import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateProduct from './CreateProduct'
import React from 'react'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CreateProduct />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
