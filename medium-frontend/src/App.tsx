import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import { useEffect } from 'react'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/blogs' element={<Blogs />}/>
        <Route path='/blog/:id' element={<Blog />}/>
        <Route path='/publish' element={<Publish />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

function Home(){
  const navigate = useNavigate();

  useEffect(()=>{
    const authToken = localStorage.getItem("token");

    if(!authToken){
      navigate('/login');
    }
    else{
      navigate('/blogs')
    }
  }, []);

  return null;
}

export default App
