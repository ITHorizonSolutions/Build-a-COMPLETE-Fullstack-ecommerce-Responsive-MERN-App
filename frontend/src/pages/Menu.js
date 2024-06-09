import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import RecommentProduct from '../components/RecommentProduct'
import { addToCart } from '../store/userSlice'

const Menu = () => {
  const { productId } = useParams()
  const product = useSelector(state => state?.user?.product)
  const [productDetails,setProductDetails] = useState({
    _id : "",
    name : "",
    description :  "" ,
    price :  "",
    category : "", 
    image :  ""           
  })  
  const dispatch = useDispatch()

  useEffect(()=>{
    const filterProduct = product.find(item => item._id === productId)
    setProductDetails(filterProduct)
  },[productId,product])

  const handleAddToCart = (e)=>{
    e.preventDefault()
    e.stopPropagation()
    //logic of add to cart
    dispatch(addToCart(productDetails))
}

  return (
    <div>
        <div className='w-full max-w-2xl flex flex-col lg:flex-row p-2  gap-4 mx-auto my-3'>
            <div className='w-96 h-fit min-w-[280px] min-h-[280px] p-4 bg-slate-200'>
              <img
                src={productDetails?.image}
                className='object-scale-down w-full h-full mix-blend-multiply'
              />
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-green-700 font-medium text-sm'>{productDetails?.category}</p>
                <p className='text-lg lg:text-2xl capitalize font-semibold '>{productDetails?.name}</p>
                <div className='flex items-center gap-3 justify-between'>
                    <p className='text-green-800 font-bold text-lg lg:text-2xl'>$ {productDetails?.price}</p>
                </div>
                <button className='bg-green-600 text-white px-2 py-2 my-3 rounded text-sm hover:bg-green-700' onClick={handleAddToCart}>ADD To CART</button>
                <p className='font-medium'>Description</p>
                <p>
                  {productDetails?.description}
                </p>
            </div>
        </div>

        <RecommentProduct category={productDetails?.category} product={product} />
    </div>
  )
}

export default Menu
