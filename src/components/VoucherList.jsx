import React, { useRef, useState } from 'react'
import { HiSearch, HiX } from "react-icons/hi";
import { HiChartBar, HiChevronDown, HiChevronUp, HiOutlineEyeDropper, HiOutlineTrash, HiPlus } from "react-icons/hi2";
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { throttle, debounce } from 'lodash';
import VoucherListRow from './VoucherListRow';
import { set } from 'react-hook-form';
import Pagination from './Pagination';

const fetcher = (url) => fetch(url).then((res) => res.json());

const VoucherList = () => {

  const location = useLocation();
  const [params,setParams] = useSearchParams()
 

  // const [search, setSearch] = useState('');
  const [fetchUrl, setFetchUrl] = useState(import.meta.env.VITE_API_URL + "/vouchers" + location.search);

  //const inputSearch = useRef("")


  // console.log(search);
 const {data,isLoading,error} = useSWR( fetchUrl, fetcher)

  //throttle & debounce

//  const handleSearch = (e) => {
//    //console.log(e.target.value);
//    setSearch(e.target.value);
//  }

const handleSearch = debounce((e) => {
 if(e.target.value){
  setParams({q: e.target.value});
  //console.log(e.target.value);
  setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?q=${e.target.value}`);
 }else{
  setParams({});
  setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers`);
 }
}, 500);

// const handleClearSearch = () => {
//   setSearch('');
//   inputSearch.current.value = "";
// }
const updateFetchUrl = (url) => {
  const currentUrl = new URL(url);
  const newSearchParams = new URLSearchParams(currentUrl.search);
  //console.log(newSearchParams);
  //  const currentParams = params.entries()
  // console.log(currentParams.next());
 
  //console.log(url);
  // const currentUrl = new URL(url);
  // console.log(currentUrl);
   const paramsObject = Object.fromEntries(newSearchParams);
   //console.log(paramsObject);
  setParams(paramsObject)
  
  setFetchUrl(url);
}

// {isLoading ? <p>Loading...</p> : null}

// console.log(data);

const handleSort = (sortData) => {
  // console.log(sortData);
  const sortParams = new URLSearchParams(sortData).toString();
  setParams(sortData);
  setFetchUrl(`${import.meta.env.VITE_API_URL}/vouchers?${sortParams}`);
}


  return (
    <div>
    <div className="flex justify-between mb-3">
      <div className="">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <HiSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
           
            onChange={handleSearch}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Voucher"
          />
          {/* {search && <button className='absolute right-2 top-0 bottom-0 m-auto' onClick={handleClearSearch}>
            <HiX fill='red' className='scale-100 active:scale-75 duration-200'/>
            </button>} */}
        </div>
      </div>
      <div className="">
        <Link to={"/sale"}
          type="submit"
          className="text-white flex justify-center items-center gap-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create Sale
          <HiChartBar />
        </Link>
      </div>
    </div>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3 ">
             <div className="flex items-center gap-1">
             <span className='flex flex-col'>
                <button className='hover:bg-stone-500' onClick={handleSort.bind(null,{sort_by: 'id', sort_direction: 'asc'})}>
                  <HiChevronUp/>
                </button>
                <button className='hover:bg-stone-500' onClick={handleSort.bind(null,{sort_by: 'id', sort_direction: 'desc'})}>
                  <HiChevronDown/>
                </button>
              </span>
              <span>#</span>
             </div>
            </th>
            <th scope="col" className="px-6 py-3">
               Voucher ID
            </th>
            <th scope="col" className="px-6 py-3">
              Customer
            </th>

          
            <th scope="col" className="px-6 py-3 text-end">
            <div className="flex items-center gap-1">
             <span className='flex flex-col'>
                <button className='hover:bg-stone-500' onClick={handleSort.bind(null,{sort_by: 'total', sort_direction: 'asc'})}>
                  <HiChevronUp/>
                </button>
                <button className='hover:bg-stone-500' onClick={handleSort.bind(null,{sort_by: 'totaln', sort_direction: 'desc'})}>
                  <HiChevronDown/>
                </button>
              </span>
              <span>Total</span>
             </div>
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Created At
            </th>
            <th scope="col" className="px-6 py-3 text-end">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hidden last:table-row">
            <td colSpan={5} className="px-6 py-4 text-center">
              There is no voucher yet.
            </td>
          </tr>
          {isLoading ? 
          <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hidden last:table-row">
          <td colSpan={5} className="px-6 py-4 text-center">
            Loading.....
          </td>
        </tr>
          : data?.data?.map((voucher,index) => (
            <VoucherListRow key={voucher.id} voucher={voucher} />
          ))}
       
        </tbody>
      </table>
   
    </div>
    {!isLoading && <Pagination meta={data?.meta} links={data?.links} updateFetchUrl={updateFetchUrl}/>}
   
  </div>
  )
}

export default VoucherList