import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { setuser, setToken, increaseQuantity, descreaseQuantity, addToCart,clearAddToCart } from '../store/userSlice'
import { FaRegUserCircle } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import toast from 'react-hot-toast'

const Header = () => {
    const user  = useSelector(state => state.user)
    const product = useSelector(state => state?.user?.product)
    const cartItems  = useSelector(state => state.user.cartItems)
    const dispatch = useDispatch()
    const [openMenu,setOpenMenu] = useState(false)
    const [openCartItems,setOpenCartItems] = useState(false)
    const navigate = useNavigate()

    const handleLogout = async()=>{
       try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/logout`)

            if(response.data.logout){
                localStorage.clear()
                dispatch(setuser({email : "", name : ""}))
                dispatch(setToken(null))
                setOpenMenu(false)
                setOpenCartItems(false)
                dispatch(clearAddToCart()) 
                navigate('/')
                window.scrollTo({ behavior : 'smooth' ,top : 0})
            }
       } catch (error) {
        
       }

    }

    const handleProceedPayment = ()=>{
        if(!user?.email){
            toast.error("Please Login to proceed.")
            return
        }

        toast.success("Redirect To Payment")

    }

    const totalQuantity = cartItems?.reduce((preve,curr)=> preve + curr.quantity ,0)
    const totalPrice = cartItems?.reduce((preve,curr)=> preve + ( curr.price * curr.quantity) ,0)
  return (
   <>
        <header className=' fixed h-16 w-full shadow-md bg-white px-4 flex items-center justify-between z-40'>
                <Link to={"/"} className='w-32 lg:w-40 block h-full'>
                    <img
                        src={logo} 
                        className='w-full h-full object-scale-down'
                    />
                </Link>

                {
                    user.name && (
                        <div className='flex items-center gap-1 text-green-700'>
                            <span><MdVerified/></span>
                            <p className='capitalize max-w-[80px] text-ellipsis line-clamp-1 lg:max-w-[200px] font-semibold'>{user.name}</p>
                        </div>
                    )
                }
                
            

                <div className='flex items-center gap-6'>
                    <nav className='hidden md:flex gap-6 items-center text-lg'>
                        <NavLink to={"/"} className={({isActive}) => `${isActive ? "font-semibold text-green-700" : "font-normal text-black"}`}>
                            Home
                        </NavLink>

                        <NavLink to={"/"+product[product?.length - 1]?._id} className={({isActive}) => `${isActive ? "font-semibold text-green-700" : "font-normal text-black"}`}>
                            Menu
                        </NavLink>

                        <NavLink to={"/about"} className={({isActive}) => `${isActive ? "font-semibold text-green-700" : "font-normal text-black"}`}>
                            About
                        </NavLink>
                        
                        <NavLink to={"/contact"} className={({isActive}) => `${isActive ? "font-semibold text-green-700" : "font-normal text-black"}`}>
                            Contact
                        </NavLink>
                        
                    </nav>
                    <div className='relative cursor-pointer' onClick={()=>setOpenCartItems(preve => !preve)}>
                        <FaCartShopping size={23}/>
                        <p className='absolute -top-3 -right-2 w-5 h-5 p-0.5 rounded-full bg-green-500 text-white text-xs text-center select-none '>{cartItems?.length}</p>
                    </div>
                    {
                        user.email ? (
                            <div className='relative'>
                                <div onClick={()=>setOpenMenu(preve => !preve)} className='cursor-pointer'>
                                    <FaRegUserCircle size={28}/>
                                </div>

                                {
                                    openMenu && (
                                        <div className='absolute top-10 p-4 right-0 bg-white shadow-md min-w-[150px] rounded'>
                                            {
                                                process.env.REACT_APP_ADMIN_EMAIL === user.email && (
                                                    <NavLink to={"/upload-product"} className={({isActive}) => `${isActive ? "font-semibold text-green-700" : "font-normal text-black"} hover:text-green-600`}>
                                                        Upload Product
                                                    </NavLink>
                                                )
                                            }
                                            
                                            <button onClick={handleLogout} className='hover:text-red-600'>Logout</button>
                                        </div>
                                    )
                                }
                                
                            </div>
                        ) : (
                            <Link to={"/login"} className='bg-green-600 border border-green-600 text-white px-3 py-1 rounded font-semibold'>
                                Login
                            </Link>
                        )
                    }
                    
                </div>
        </header>
                
        {
            openCartItems && (
                <div className='min-h-[calc(100vh-4rem)] h-full max-h-[calc(100vh-4rem)] w-full max-w-sm bg-white fixed top-16 right-0 bottom-0 z-30 shadow '>
                    <div className='p-4'>
                        <div className='flex items-center justify-between'>
                            <h2 className='font-semibold text-lg'>Cart</h2>
                            <button className='hover:text-green-600' onClick={()=>setOpenCartItems(false)}>
                                <IoClose size={25}/>
                            </button>
                        </div>
                        <div className='min-h-[calc(100vh-15rem)] w-full h-full max-h-[calc(100vh-15rem)]  overflow-y-auto my-3'>
                            {
                                cartItems.map((item,index)=>{
                                    return(
                                        <div key={item._id+'cart'} className='p-2 border flex gap-2'>
                                            <div className='w-20 h-20 bg-slate-200 p-2'>
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className='w-full h-full object-scale-down mix-blend-multiply'
                                                />
                                            </div>
                                            <div>
                                                <p className='text-green-700 font-medium text-xs'>{item.category}</p>
                                                <p className='text-ellipsis line-clamp-1 capitalize font-semibold '>{item.name}</p>
                                                <p className='text-green-800 font-bold'>$ {item.price}</p>
                                                <div className='flex items-center gap-3 justify-between'>
                                                   <div className='flex items-center gap-2'>
                                                        <button onClick={()=>dispatch(increaseQuantity(item._id))} className='bg-green-600 text-white min-w-5 min-h-5 max-h-5 flex items-center justify-center'>+</button>
                                                        <p>{item?.quantity}</p>
                                                        <button onClick={()=>dispatch(descreaseQuantity(item._id))} className='bg-green-600 text-white min-w-5 min-h-5 max-h-5 flex items-center justify-center'>-</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='flex items-center justify-between flex-wrap gap-3 font-semibold my-2'>
                            <p>Total Quantity : {totalQuantity}</p>
                            <p>Total Price : ${totalPrice}</p>
                        </div>

                        <button onClick={handleProceedPayment} className='h-14 w-full flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold leading-relaxed rounded'>
                            PROCEED TO PAYMENT
                        </button>
                    </div>
                </div>
            )
        }

   </>
  )
}

export default Header
