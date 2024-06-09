import React from 'react'
import { useSelector } from 'react-redux'

import HeroSection from '../components/HeroSection'
import BestProduct from '../components/BestProduct'
import FilterProduct from '../components/FilterProduct'

const Home = () => {
  const product = useSelector(state => state?.user?.product)

  console.log("product",product)
  return (
    <div>
        <HeroSection product={product}/>
        <BestProduct product={product} />
        <FilterProduct product={product}/>
    </div>
  )
}

export default Home

