import React, { useRef } from 'react'
import CardProduct from './CardProduct'
import { FaAngleLeft , FaAngleRight } from "react-icons/fa6";

const BestProduct = ({product}) => {
  const countainerRef = useRef()

  const handleNext = ()=>{
    countainerRef.current.scrollLeft += 300
  }

  const handlePrevious = ()=>{
    countainerRef.current.scrollLeft -= 300
  }
  return (
    <section className='container mx-auto px-4'>
        <h1 className='my-3 font-bold text-xl'>Best Selling Product</h1>
        <div className='relative'>
            <div className='w-full flex items-center gap-5 overflow-x-scroll scrollbarNone relative z-10 transition-all scroll-smooth ' ref={countainerRef}>
                {
                  product.slice(-20).map((item,index)=>{
                    return(
                        <CardProduct item={item} key={item?._id}/>
                    )
                  }) 
                }
            </div>
            <div className='absolute top-0 right-0 left-0 bottom-0 hidden  lg:flex items-center justify-between w-full'>
                    <button onClick={handlePrevious} className='bg-white p-1 w-8 h-8 rounded-full shadow-md flex items-center justify-center text-lg z-10 '><FaAngleLeft/></button>
                    <button onClick={handleNext} className='bg-white p-1 w-8 h-8 rounded-full shadow-md flex items-center justify-center text-lg z-10'><FaAngleRight/></button>
            </div>
            </div>
    </section>
  )
}

export default BestProduct
