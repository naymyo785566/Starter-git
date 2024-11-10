import React, { useState } from 'react'
import { HiOutlineEyeDropper, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { mutate, useSWRConfig } from 'swr';
import { dotWave } from 'ldrs'
import toast from 'react-hot-toast';
import { json, Link } from 'react-router-dom';
import ShowDate from './ShowDate';

dotWave.register()

// Default values shown


const ProductRow = ({product:{id,product_name,price,created_at,updated_at}}) => {
    const {mutate} = useSWRConfig()
    const [isDeleting, setIsDeleting] = useState(false);
  

    const handleDeleteBtn = async () => {
        setIsDeleting(true);
        const res = await fetch(import.meta.env.VITE_API_URL+`/products/${id}`, {
          method: "DELETE",
        })
        const json = await res.json();
        // console.log(id);
        if(res.status === 200){
          
          toast.success(json.message);
        mutate("http://localhost:5000/products")
        }else{
          toast.error(json.message);
        }
    }
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
    <td className="px-6 py-4">{id}</td>
    <th
      scope="row"
      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {product_name}
    </th>

    <td className="px-6 py-4 text-end">{price}</td>
    <td className="px-6 py-4 text-end">
    <ShowDate timestamp={created_at} />
    </td>
    <td className="px-6 py-4 text-end">
    <ShowDate timestamp={updated_at} />
    </td>
    <td className="px-6 py-4 text-end">
      <div className="flex space-x-2 justify-end">
        <div
          className="inline-flex rounded-md shadow-sm"
          role="group"
        >
          <Link
            to={`/product/edit/${id}`}
            className="size-10 flex justify-center items-center text-sm font-medium text-stone-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <HiOutlineEyeDropper />
          </Link>
          <button
            type="button"
            onClick={handleDeleteBtn}
            className="size-10 flex justify-center items-center text-sm font-medium text-red-600 bg-white border-t border-b border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:hover:text-white dark:hover:bg-stone-700 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            {isDeleting ? <l-dot-wave
  size="20"
  speed="1" 
  color="red" 
></l-dot-wave> : <HiOutlineTrash />}
            
          </button>
        </div>
      </div>
    </td>
  </tr>
  )
}

export default ProductRow