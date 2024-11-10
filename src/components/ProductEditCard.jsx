import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { dotSpinner } from 'ldrs'
import toast from "react-hot-toast";
import useSWR from "swr";

dotSpinner.register()

// Default values shown

const fetcher = (url) => fetch(url).then((res) => res.json());
const ProductEditCard = () => {
  const { register, handleSubmit, formState: { errors }} = useForm();

  const[isSending, setIsSending] = useState(false);

  const {id} = useParams()
  // console.log(id);

  const{data,isLoading,error} = useSWR(import.meta.env.VITE_API_URL + `/products/${id}`, fetcher)

  // {isLoading ? <p>Loading...</p> : null}

  // console.log(data);
  const navigate = useNavigate();

  const handleUpdateProduct = async (data) => {
    //  console.log(data);
    setIsSending(true)
    
   
    await fetch(import.meta.env.VITE_API_URL +"/products/"+id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({product_name: data.product_name,price: data.price,created_at : new Date().toISOString()}),
    })
    setIsSending(false)
   
    if(data.back_to_product_list){ 
      navigate("/product")
    }
    toast.success("Product updated successfully")
  };

  return (
    <div className="rounded-lg w-full md:w-1/2">
      <h1 className="text-3xl font-bold mb-3">Edit Product</h1>
      <p className="text-stone-500 mb-10">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere alias reiesse, dolore quisquam facilis{" "}
      </p>
      {
        isLoading ?  <div className="animate-pulse">
        <div className="mb-5">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="mb-5">
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-48 ms-2"></div>
        </div>
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-48 ms-2"></div>
        </div>
        <div className="flex space-x-4">
          <div className="h-10 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-blue-300 rounded w-36"></div>
        </div>
      </div> : 
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
        <div className="mb-5">
          <label
            htmlFor="product_name"
            className={`block mb-2 text-sm font-medium ${errors.product_name ? "text-red-500" : "text-gray-900"} dark:text-white`}
          >
            Product Name
          </label>
          <input
            type="text"
            {...register("product_name", { required: true, minLength: 3, maxLength: 20 })}
            defaultValue={data?.data?.product_name}
            className={`bg-gray-50 border ${errors.product_name ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg. apple"
          />
          {errors.product_name?.type === "required" && (
            <p className="text-red-500 text-sm  mt-1">Product name is required</p>
          )}
          {errors.product_name?.type === "minLength" && (
            <p className="text-red-500 text-sm  mt-1">Product name must be at least 3 characters</p>
          )}
          {errors.product_name?.type === "maxLength" && (
            <p className="text-red-500 text-sm  mt-1">Product name must not exceed 20 characters</p>
          )}
        </div>

        <div className="mb-5">
          <label
            htmlFor="price"
            className={`block mb-2 text-sm font-medium ${errors.price ? "text-red-500" : "text-gray-900"} dark:text-white`}
          >
            Product Price
          </label>
          <input
            type="number"
            {...register("price", { required: true, min: 10 })}
            defaultValue={data?.data?.price}
            className={`bg-gray-50 border ${errors.price ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"} text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="eg. 100"
          />
          {errors.price?.type === "required" && (
            <p className="text-red-500 text-sm  mt-1">Price is required</p>
          )}
          {errors.price?.type === "min" && (
            <p className="text-red-500 text-sm mt-1">Price must be a positive value</p>
          )}
        </div>

        <div className="flex items-center mb-4">
          <input
            {...register("all_correct", { required: true })}
            id="all-correct"
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="all-correct"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Make sure all fields are correct
          </label>
          {errors.all_correct && (
            <p className="text-red-500 ms-2 text-sm">You must confirm the fields are correct</p>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            {...register("back_to_product_list")}
            id="back_to_product_list"
            type="checkbox"
            checked
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="back_to_product_list"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Back to product list after saving
          </label>
         
        </div>

        <Link
          to="/product"
          className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Cancel
        </Link>

        <button
          type="submit"
          className="text-white inline-flex gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span>Update Product</span>
          
          {isSending && (<l-dot-spinner
  size="20"
  speed="0.9" 
  color="white" 
></l-dot-spinner> )}
        </button>
      </form>

      }
      
    </div>
  );
};

export default ProductEditCard
