import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //NEW IMPORT
import { add } from "../store/cartSlice"; //NEW IMPORT
import { fecthProducts } from "../store/productSlice";
import { STATUSES } from "../store/productSlice";

function Products() {
  const dispatch = useDispatch();

  const { data, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fecthProducts());
    // const fecthProducts = async () => {
    //   const res = await fetch("https://fakestoreapi.com/products");
    //   const data = await res.json();
    //   console.log(data);
    //   setProducts(data);
    // };
    // fecthProducts();
  }, []);

  // NEW METHOD
  const handleAdd = (product) => {
    dispatch(add(product));
  };

  if (status === STATUSES.LOADING) {
    return <h2>Loading...</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something Went Wrong...</h2>;
  }

  return (
    <div className="productsWrapper">
      {data.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.image} alt="" />
          <h4>{product.title}</h4>
          <h5>{product.price}</h5>
          <button onClick={() => handleAdd(product)} className="btn">
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
