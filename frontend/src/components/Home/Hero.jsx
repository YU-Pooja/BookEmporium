import React from 'react'
import './Herro.css'
import { Link } from 'react-router-dom';
import RecentlyAdded from './RecentlyAdded';


// correct one 
const Hero = () => {
        return (
            <>
            <div className='mx-auto w-100 h-100 container flex'>
                <div className="mx-auto flex flex-col mt-[90px]">
                    <h1 className=' mx-auto  text-4xl lg:text-6xl font-semibold text-white lg:text-left bg-black rounded-lg px-4 py-2'>DISCOVER YOUR-SELF</h1>
                    <div className='mt-8'>
                        <Link to="/all-books" className='mt-[90px] bg-white font-semibold text-black text-xl lg:text-2xl border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover Books</Link>
                    </div>
                    {/* <p className='bg-black mx-auto text-2xl text-white bold text-center lg:text-center font-semibold rounded-lg px-2 py-2 mt-[200px] mb-[10%]'>
                        Books are the quietest and most constant of friends; they are <br/> the most accessible and wisest of counselors, and the most patient of teachers.
                    </p> */}
                    
                </div>
                
            </div>
            <RecentlyAdded />
            </>

        );
    };
    
//By Teacher
// const Hero = () => {
//     return (
//         <div className='h-[75vh] flex'>
//             <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center">
//                 <h1 className='text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left px-3'>DISCOVER YOUR-SELF</h1>
//                 <p className='mt-4 text-xl text-zinc-300 text-center lg:text-left px-3'>
//                     Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.
//                 </p>
//                 <div className='mt-8 px-3'>
//                     <button className='font-semibold text-yellow-100 text-xl lg:text-2xl border border-yellow-100 px-10 py-3 hover:bg-zinc-800 rounded-full'>Discover Books</button>
//                 </div>
//             </div>
//             <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
//             <img src="./bookbg.png" alt="bgimg"/>
//             </div>
//         </div>
//     );
// };

export default Hero