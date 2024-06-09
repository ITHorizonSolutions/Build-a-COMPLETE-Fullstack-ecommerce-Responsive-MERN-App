import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const token = localStorage.getItem('token')

const initialState = {
  name : "",
  email : "",
  token : token,
  product : [],
  cartItems : [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken : (state,action)=>{
        state.token = action.payload
    },
    setuser : (state,action)=>{
        state.name = action.payload.name
        state.email = action.payload.email
    },
    setProduct : (state,action)=>{
      state.product = action.payload
    },
    addToCart : (state,action) => {
      const productIndex = state.cartItems.findIndex(item => item._id === action.payload._id)

      if(productIndex === -1){
        state.cartItems = [...state.cartItems,{ ...action.payload,quantity  : 1 }]
        toast.success("Product added to cart")
      }else{
        toast.error("Already added to cart")
      }
    },
    increaseQuantity : (state,action)=>{
      const productIndex = state.cartItems.findIndex(item => item._id === action.payload)
      
      const quantity = state.cartItems[productIndex].quantity

      state.cartItems[productIndex].quantity = quantity + 1
    },
    descreaseQuantity : (state,action)=>{
      const productIndex = state.cartItems.findIndex(item => item._id === action.payload)
      
      const quantity = state.cartItems[productIndex].quantity

      if(quantity > 1){
        state.cartItems[productIndex].quantity = quantity - 1
      }
    },
    clearAddToCart : (state,action)=>{
      state.cartItems = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setToken, setuser, setProduct,addToCart,increaseQuantity, descreaseQuantity,clearAddToCart } = userSlice.actions

export default userSlice.reducer