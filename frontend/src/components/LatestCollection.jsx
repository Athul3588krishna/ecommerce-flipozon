import React,{useContext} from 'react'
import { ShopContext } from '../context/ShopContext'

const LatestCollection=()=> {

    const {products}=useContext(ShopContext);
    console.log(products);

  return (
    <div>
        <Hero/>
        <LatestCollection/>
    </div>
  )
}

export default LatestCollection