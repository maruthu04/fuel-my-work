import React from 'react'
// import { useRouter } from 'next/navigation';
// import { useParams } from 'next/navigation';

const Username = async ({params}) => {
  const { username } = await params;  
  return (
    <>
      <div className="cover-image relative"><img className="cover-image" src="./coverimage.jpg" alt="cover photo" />
      <div className="profile absolute -bottom-15 left-1/2 transform -translate-x-1/2">
        <img width={140} className='rounded-full bg-slate-600' src="./profile.webp" alt="" />
      </div>
      </div>

      <div className="writings flex flex-col items-center mt-16 gap-2">
        <div className="name text-4xl font-bold">Virat Kohli</div>
        <div className="description text-slate-500">I am Software Developer</div>
        <div className='text-slate-500'>9719 members . 82 posts .  350/Releases </div>
      </div>

      <div className="payment flex gap-8 w-[80%] mx-auto mt-6 mb-20">
        <div className="supporters w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4 h-100 ">
        <h2 className='text-2xl font-bold mb-3'>Supporters</h2>
        {/* //show list of all supporters as a horizontal scrollable list of profile pictures */}
        <ul className='mx-4 text-lg'>
          <li className='flex gap-2 items-center mb-2'><img width={33} src="./avatar.gif" alt="avatar gif" />
            Shubham donated <span className='font-bold'> 500</span> with a message ""</li>
          <li className='flex gap-2 items-center mb-2'><img width={33} src="./avatar.gif" alt="avatar gif" />
            Shubham donated <span className='font-bold'> 500</span> with a message ""</li>
          <li className='flex gap-2 items-center mb-2'><img width={33} src="./avatar.gif" alt="avatar gif" />
            Shubham donated <span className='font-bold'> 500</span> with a message ""</li>
          <li className='flex gap-2 items-center mb-2'><img width={33} src="./avatar.gif" alt="avatar gif" />
            Shubham donated <span className='font-bold'> 500</span> with a message ""</li>
        </ul>
        </div>
        <div className="makePayment w-1/2 bg-gray-50 border border-gray-400 rounded-xl shadow-sm text-gray-900 p-4 ">
          <h2 className='text-2xl font-bold mb-3'>Make a Payment</h2>
          <div className="flex flex-col gap-2 ">
            <input type="text" placeholder='Enter Name' className='border border-gray-400 rounded-xl p-2 w-full'/>
            <input type="text" placeholder='Enter Message' className='border border-gray-400 rounded-xl p-2 w-full'/>
          </div>
          <div className="flex mt-2 gap-2">
            <input type="number" placeholder='Enter Amount' className='border border-gray-400 rounded-xl p-2 w-[75%]'/>
            <button className='bg-blue-600 text-white rounded-xl px-4 w-[25%] cursor-pointer'>Pay</button>
          </div>

          <div className="amount flex gap-4 mt-6">
            <div className='border border-blue-600 rounded-xl p-2 cursor-pointer font-bold bg-blue-100'>Pay 100</div>
            <div className='border border-blue-600 rounded-xl p-2 cursor-pointer font-bold bg-blue-100'>Pay 500</div>
            <div className='border border-blue-600 rounded-xl p-2 cursor-pointer font-bold bg-blue-100'>Pay 1000</div>
          </div>
        </div>
      </div>


    </>
  )
}

export default Username