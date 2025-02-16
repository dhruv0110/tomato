import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/placeOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/Verify/Verify'
import MyOrders from './pages/MyOrders/MyOrders'
import axios from 'axios'

const App = () => {

  const [showLogin , setShowLogin] = useState(false)

  const [userInfo,setUserInfo] = useState(null);


  const getUserInfo = async()=>{
    try {
      const response = await axios.get("/get-user");
      if(response.data && response.data.user){
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if(error.response.satus === 401){
        localStorage.clear();
      }
    }
  };

  useEffect(()=>{
    getUserInfo();
  });
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Navbar userInfo={userInfo} setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
        <Route path="/verify" element={<Verify/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App
