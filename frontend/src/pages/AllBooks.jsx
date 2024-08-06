import React from 'react'
import Loader from '../components/Loader'
import BookCard from '../components/BookCard/BookCard'
import { useEffect, useState } from 'react'
import axios from "axios"

const AllBooks = ({}) => {

  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const responseData = await axios.get("http://localhost:3004/book/get-all-book")
      setData(responseData.data.data)
    };
    fetch();
  }, []);

  return (
    <div className='bg-zinc-900 h-auto px-12 py-8'>
     <h4 className='text-3xl text-yellow-50'>
        ALL BOOKS
      </h4>
      {!Data && (<div className='flex items-center justify-center my-8'>
        <Loader />{" "}
      </div>)
      }

      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
        {Data && Data.map((items, i) => (
          <div key={i}>
            <BookCard data={items} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllBooks