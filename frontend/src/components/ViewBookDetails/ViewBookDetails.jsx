import React from 'react'
import { useParams } from "react-router-dom"
import Loader from '../../components/Loader'
// import BookCard from '../../components/BookCard/BookCard'
import { useEffect, useState } from 'react'
import axios from "axios"
import { GrLanguage } from "react-icons/gr";


const ViewBookDetails = () => {
    const { id } = useParams();
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const responseData = await axios.get(`http://localhost:3004/book/get-book-by-id/${id}`)
            console.log(responseData.data.data)
            setData(responseData.data.data)
        };
        fetch();
    }, []);
    // /get-book-by-id/:bookid
    return (
        <>
        {Data && (
            <div className='px-4 md:px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-8'>
            <div className='bg-zinc-800 rounded p-4 h-[60vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-center '>
                <img src={Data.url} alt="bookimghere" className='h-[50vh] lg:h-[70vh] rounded' />
            </div>
            <div className="p-4 w-full lg:w-3/6">
                <h1 className='text-zinc-300 text-4xl font-semibold'>{Data.title}</h1>
                <p className='text-zinc-300 mt-1'>{Data.author}</p>
                <p className='text-zinc-300 mt-4 text-xl'>{Data.desc}</p>
                <p className='text-zinc-300 flex mt-4 items-center justify-start'> <GrLanguage className="me-3" />{Data.language}</p>
                <p className='text-zinc-300 mt-4 text-3xl font-semibold'>Price: $ {Data.price}{" "}</p>
            </div>
        </div>)}
        {!Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'>
            <Loader/>{" "}</div>}
        </>
    )
}

export default ViewBookDetails