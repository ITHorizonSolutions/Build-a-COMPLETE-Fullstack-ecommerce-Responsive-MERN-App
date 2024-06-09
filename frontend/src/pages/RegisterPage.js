import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const [data,setData] = useState({
    email : "",
    password : "",
    name : ""
  })
  const navigate = useNavigate()

  const handleOnChange = (e)=>{
    const { name, value } = e.target

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleSubmit = async(e)=>{
      e.preventDefault()

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/register`,data)

      if(response.data.success){
        toast.success(response.data.message)
        navigate("/login")
      }else{
        toast.error(response.data.message)
      }

  }


  return (
    <div className='mt-3'>
        <div className='w-full bg-white p-4 max-w-md mx-auto shadow-md rounded-md'>
            <p>Welcome to EatAvenue !!</p>

            <form className='grid gap-4 py-4' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        name='name' 
                        placeholder='enter your name'
                        className='bg-slate-200 p-1 px-2 rounded'
                        onChange={handleOnChange}
                        required
                      />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='email'>Email</label>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        placeholder='enter your email'
                        className='bg-slate-200 p-1 px-2 rounded'
                        onChange={handleOnChange}
                        required
                      />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor='password'>Password</label>
                    <input 
                        type='password' 
                        id='password' 
                        name='password' 
                        placeholder='enter your password'
                        className='bg-slate-200 p-1 px-2 rounded'
                        onChange={handleOnChange}
                        required
                      />
                </div>

                <button className='w-full p-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700'>Register</button>
            </form>

            <p>
              Already have account ? <Link to={"/login"} className='text-green-600 font-semibold' >Login</Link>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage
