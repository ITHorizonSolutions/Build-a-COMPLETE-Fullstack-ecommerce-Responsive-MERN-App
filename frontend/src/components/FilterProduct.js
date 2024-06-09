import React, { useEffect, useState } from 'react'
import { ImSpoonKnife } from "react-icons/im";
import categoryList from '../utils/category';
import CardProduct from './CardProduct';

const FilterProduct = ({product}) => {
    const [filterCategory,setFilterCategory] = useState('')

    useEffect(()=>{
        setFilterCategory(categoryList[0].value)
    },[product])

  return (
    <div className='container mx-auto p-4 my-6'>
        <div className='w-fit mx-auto flex  gap-1 lg:gap-4'>
            {
                categoryList.map((category,index)=>{
                    return(
                        <div key={category.value+index+"filtersection"} className={`lg:min-w-[100px] flex flex-col items-center gap-1 group cursor-pointer ${filterCategory === category.value ? "text-green-800" : "text-black"}`} onClick={()=>setFilterCategory(category.value)}>
                            <div className='bg-green-200 text-green-600 p-1 w-9 h-9 lg:w-14 lg:h-14 rounded-full flex items-center justify-center mx-auto group-hover:bg-green-200 group-hover:text-green-700'>
                                <ImSpoonKnife size={25}/>
                            </div>
                            <p className='text-sm group-hover:text-green-700 text-center'>{category.label}</p>
                        </div>
                    )
                })
            }
        </div>

        <div className='w-full max-w-4xl flex items-center justify-center gap-4 flex-wrap mx-auto my-6'>
            {
                product.filter(item => item.category === filterCategory).map((item,index)=>{
                    return(
                       <CardProduct item={item} key={item._id+index+"filterSEction_product"}/> 
                    )
                })
            }
        </div>
    </div>
  )
}

export default FilterProduct
