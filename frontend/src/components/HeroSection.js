import React from 'react'
import deliveryManImage from '../assets/delivery-man.png'

const HeroSection = ({ product }) => {
  return (
    <section className='container mx-auto w-full flex flex-col lg:flex-row lg:justify-between px-4 py-4'>
        <div className='py-2 flex-1'>
            <div className='bg-green-200 flex items-center px-2 py-1 gap-2 rounded-full w-fit'>
                <p className='text-green-700 font-bold'>Bike Delivery</p>
                <div className='w-9 h-8 rounded-full bg-white'>
                  <img 
                    src={deliveryManImage}
                    className='w-full h-full'
                  />
                </div>
            </div>
            <div className='my-3 max-w-lg'>
              <h1 className='text-4xl lg:text-6xl font-bold '>
                The Fasted Delivery in <span className='text-green-600'>Your Home</span>
              </h1>
              <p className='my-3'>
                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
            <button className='bg-green-600 font-bold text-white px-4 py-2 rounded hover:bg-green-700 hover:scale-105 transition-all my-3'>Order Now</button>
        </div>

        <div className='w-full h-full flex items-center justify-center flex-1 py-4 lg:pl-4'>
          <div className='flex flex-wrap gap-5 lg:gap-12 mx-auto max-w-md '>
              {
                product.slice(-4).map((item,index)=>{
                  return(
                    <div className='w-fit mx-auto max-w-[200px] flex flex-col items-center justify-center'>
                        <div className='w-24'>
                          <img
                            src={item.image}
                            className='w-full object-scale-down' 
                          />
                        </div>
                        <p className='text-green-700 font-medium text-sm'>{item.category}</p>
                        <p className='text-ellipsis line-clamp-2'>{item.name}</p>
                        <p className='text-green-800 font-bold'>$ {item.price}</p>
                    </div>
                  )
                })
              }
          </div>
        </div>

    </section>
  )
}

export default HeroSection
