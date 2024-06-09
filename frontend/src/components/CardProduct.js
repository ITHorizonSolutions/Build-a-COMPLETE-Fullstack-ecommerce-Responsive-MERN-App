import React from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from '../store/userSlice'
import { useDispatch } from 'react-redux'

const CardProduct = ({item}) => {
    const dispatch = useDispatch()

    const handleAddToCart = (e)=>{
        e.preventDefault()
        e.stopPropagation()
        //logic of add to cart
        dispatch(addToCart(item))
    }

  return (
    <Link to={"/"+item._id} className='w-52 min-w-52 shadow-md p-4 grid gap-2'>
        <div className='w-36 mx-auto'>
            <img
                src={item.image}
                alt={item.name} 
                className='object-scale-down w-full h-full'
            />
        </div>
        <p className='text-green-700 font-medium text-sm'>{item.category}</p>
        <p className='text-ellipsis line-clamp-2 capitalize font-semibold '>{item.name}</p>
        <div className='flex items-center gap-3 justify-between'>
            <p className='text-green-800 font-bold'>$ {item.price}</p>
            <button className='bg-green-600 text-white px-2 py-1 rounded text-sm hover:bg-green-700' onClick={handleAddToCart}>ADD To CART</button>
        </div>
    </Link>
  )
}

export default CardProduct
