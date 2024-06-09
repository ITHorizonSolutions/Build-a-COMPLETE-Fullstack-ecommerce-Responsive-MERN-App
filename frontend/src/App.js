import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import  { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { setProduct, setuser } from "./store/userSlice";


function App() {
  const token = useSelector((state)=>state.user.token)
  const dispatch  = useDispatch()

  const fetchUserDetails = async()=>{
   try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user-details`)

      if(response.data.success){
        dispatch(setuser(response.data.data))
      }
   } catch (error) {
      
   }
  }

  const fetchProduct  = async()=>{
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/product`)

        if(response.data.success){
          dispatch(setProduct(response.data.data))
        }
    } catch (error) {
        
    }
  }

  useEffect(()=>{
    fetchUserDetails()
  },[token])

  useEffect(()=>{
    fetchProduct()
  },[])

  return (
    <main>
        <Toaster/>
        <Header/>
        <div className="pt-16">
          <Outlet/>
        </div>
    </main>
  );
}

export default App;
