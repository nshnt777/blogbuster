import './App.css'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Blogs from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish'
import { useEffect } from 'react'
import axios from 'axios'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import userAtom from './store/userAtom'
import Profile from './pages/Profile'
import MyBlogs from './pages/MyBlogs'

function App() {

  return (
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/blogs' element={<Blogs />}/>
        <Route path='/blog/:id' element={<Blog />}/>
        <Route path='/publish' element={<Publish />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/myblogs' element={<MyBlogs />}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}

function Home(){
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userAtom);

  useEffect(()=>{
    const authToken = localStorage.getItem("token");

    if(!authToken){
      navigate('/login');
    }
    else{
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      axios.get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })
      .then((response)=>{
        const userJson = response.data;
        setUser(userJson)
        navigate('/blogs')
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  }, []);

  return null;
}

export default App
