import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import categoryList from '../utils/category'
import { IoClose } from "react-icons/io5";
import axios from 'axios'
import toast from 'react-hot-toast'

const UploadProduct = () => {
    const user = useSelector(state => state.user)
    const [permission,setPermission]  = useState(false) 
    const [uploadProduct,setUploadProduct] = useState({
        name : "",
        description : '',
        price : "",
        category : "",
        image : ""
    })

    useEffect(()=>{
        if(process.env.REACT_APP_ADMIN_EMAIL === user.email){
            setPermission(true)
        }else{
            setPermission(false)
        }
    },[user])


    const handleOnChange = (e)=>{
        const { name, value } = e.target

        setUploadProduct((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleUpload = async(e)=>{
        const file = e.target.files[0]

        const reader = new FileReader()
        reader.readAsDataURL(file)

        const imageBase64 = await new Promise((resolve,reject)=>{
            reader.onload = () => resolve(reader.result)

            reader.onerror = (error) => reject(error)
        })

        setUploadProduct((preve)=>{
            return{
                ...preve,
                image : imageBase64,
                name : file?.name?.split("-")?.join(" ")?.split(".")[0]
            }
        })
    }

    const handleClearUpload = (e)=>{
        e.preventDefault()
        e.stopPropagation()

        setUploadProduct((preve)=>{
            return{
                ...preve,
                image : ""
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()

        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/upload-product`,uploadProduct)

        if(response.data.success){
            toast.success(response.data.message)
            setUploadProduct({
                name : "",
                description : '',
                price : "",
                category : "",
                image : ""
            })
            return
        }

        toast.error(response.data.message)
    }
  return (
    <div>
        {
            !permission && (
                <div className='bg-green-100 px-6 py-4 w-fit mx-auto'>
                    <p className='text-green-700'>Don't have permission</p>
                </div>
            )
        }

        {
             permission && (
                <div className='w-full h-full'>
                    <div className='w-full max-w-lg p-4 mx-auto mt-3 rounded shadow-md bg-white'>
                        <div className='font-semibold'>
                            Upload Product
                        </div>

                        <form className='my-4 grid gap-2' onSubmit={handleSubmit}>
                            <div className='grid gap-1'>
                                <label htmlFor='productName'>Name:</label>
                                <input
                                    id='productName'
                                    type='text'
                                    name='name'
                                    placeholder='enter product name'
                                    className='bg-slate-100 p-1' 
                                    required
                                    value={uploadProduct.name}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className='grid gap-1'>
                                <label htmlFor='category'>Category:</label>
                                <select 
                                    className='bg-slate-100 p-1' 
                                    name='category'
                                    value={uploadProduct.category}
                                    onChange={handleOnChange}
                                >
                                    <option value={""}>Select category</option>
                                    {
                                        categoryList.map((category,index)=>{
                                            return(
                                                <option key={category.value} value={category.value}>{category.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            <div className='grid gap-1'>
                                <label htmlFor='image'>
                                    Image:

                                    <div className='w-full h-40 bg-slate-200 border border-slate-300 rounded mt-2 flex justify-center items-center cursor-pointer'>
                                        
                                        {
                                           uploadProduct.image ? (
                                                <div className='w-full h-full relative'>
                                                    <button className='absolute z-10 right-0 hover:text-red-600' onClick={handleClearUpload}>
                                                        <IoClose size={28}/>
                                                    </button>
                                                    <img
                                                        src={uploadProduct.image} 
                                                        className='w-full h-full object-scale-down mix-blend-multiply'
                                                    />
                                                </div>
                                           ) : (
                                            <div>
                                                <p>Upload Image</p>
                                                <input type='file' id='image' onChange={handleUpload} className='hidden'/>
                                            </div>
                                           ) 
                                        }
                                       

                                    </div>   
                                </label>
                            </div>

                            <div className='grid gap-1'>
                                <label htmlFor='price'>Price:</label>
                                <input
                                    id='price'
                                    type='number'
                                    name='price'
                                    placeholder='enter product price'
                                    className='bg-slate-100 p-1' 
                                    required
                                    value={uploadProduct.price}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <div className='grid gap-1'>
                                <label htmlFor='description'>Description:</label>
                                <textarea
                                    id='description'
                                    type='test'
                                    name='description'
                                    placeholder='enter description'
                                    className='bg-slate-100 p-1' 
                                    required
                                    rows={3}
                                    value={uploadProduct.description}
                                    onChange={handleOnChange}
                                />
                            </div>

                            <button className='bg-green-700 text-white hover:bg-green-800 py-2 px-4 rounded mt-3'>Upload Product</button>
                        </form>
                    </div>
                </div>  
            )
        }
    </div>
  )
}

export default UploadProduct
