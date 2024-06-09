import React from 'react'
import CardProduct from './CardProduct'

const RecommentProduct = ({product,category}) => {
  return (
    <div className='container mx-auto p-4'>
        <h1 className='font-bold my-3 text-xl'>Related Product : </h1>
        <div className='w-fit flex items-center justify-center lg:justify-start gap-4 flex-wrap mx-auto my-6 px-4'>
                {
                    product.filter(item => item.category === category).map((item,index)=>{
                        return(
                        <CardProduct item={item} key={item._id+index+"recommendProduct"}/> 
                        )
                    })
                }
        </div>
    </div>
  )
}

export default RecommentProduct
