import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom"

const ContactUs = () => {
  return (
    <div className='bg-customGreen1  '>
      <div className='container'>
        <div className='grid md:grid-cols-3 pb-20 pt-5'>

          {/* company details */}
          <div className='py-8 px-4'>

            <a className='text-green-300 font-semibold tracking-widest text-2xl uppercase sm:text-3xl'>
              Gymnasium
            </a>
            <p className='text-gray-600 lg:pr-24 pt-3'>Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Assumenda autem
              repellat consequuntur </p>

            <p className='text-gray-500 mt-4'>Made with ❤️ by Ranusha Basnet</p>
            <button className='bg-green-900  hover:bg-green-950 text-white p-2 px-[2.2rem] mt-4 rounded-[2rem] font-semibold'>
              <Link to="/signup">Start Now!</Link></button>
          </div>

          {/* footer */}
          <div className=' text-white col-span-2 grid grid-cols-2 sm:grid-cols-3 md:pl-10'>
            <div className=' py-8 px-4'>
              <h1 className='mb-3 font-bold'>Products</h1>
              <ul className='space-y-3'>
                <li>Exercise</li>
                <li>App</li>
                <li>Contact</li>
                <li>Blog</li>

              </ul>
            </div>


            <div className='py-8 px-4'>
              <p className='mb-3 font-bold'>Resources</p>
              <ul className='space-y-3'>
                <li>Home</li>
                <li>About </li>
                <li>Contact </li>
                <li>blog</li>

              </ul>
            </div>
            {/* address section */}
            <div className='py-8 px-4 col-span-2 sm:col-auto'>
              <h1 className='text-xl font-semibold sm:text-lect mb-3'>Address</h1>
              <div>
                <p className='mb-3'>Kathmandu,Nepal</p>
                <p>+977 1234567890</p>
                {/* social links */}
                <div className='space-x-3 mt-6'>
                  <a href="#">
                    <FaFacebook className='inline-block hover:scale-105 duration-200' />
                  </a>
                  <a href="#">
                    <FaInstagram className='inline-block hover:scale-105 duration-200' />
                  </a>
                  <a href="#">
                    <FaTwitter className='inline-block hover:scale-105 duration-200' />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </div>

    </div>


  )
}

export default ContactUs