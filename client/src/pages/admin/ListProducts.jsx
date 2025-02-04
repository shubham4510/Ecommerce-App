import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'

const ListProducts = () => {

  const [products, setProducts] = useState([])
  const {getAllProducts,deleteProduct} = useContext(ShopContext)

  useEffect(()=>{
    const allProducts = async () => {
      const data = await getAllProducts()
      setProducts(data)
    }

    allProducts()
  },[products])

  return (
    <div className="w-full p-4">
      <p className="text-lg font-bold mb-2">All Products List</p>
  
      {/* Table Header */}
      <div className="grid grid-cols-5 bg-red-300 w-full p-2 text-center font-semibold">
        <p>Image</p>
        <p>Name</p>
        <p>Category</p>
        <p>Price</p>
        <p>Action</p>
      </div>
  
      {/* Table Rows */}
      {products.map((product) => (
        <div key={product._id} className="grid grid-cols-5 border-b p-2 text-center">
          <img src={product.image} alt={product.name} className="w-12 h-12 mx-auto" />
          <p>{product.name}</p>
          <p>{product.category}</p>
          <p>${product.price}</p>
          <button onClick={()=>deleteProduct(product._id)}>x</button>
        </div>
      ))}
    </div>
  );
  
}

export default ListProducts