'use client'
import { useState } from 'react';
import ContactInfo from '../components/contact/ContactInfo';
import { GiAntibody, GiAnts } from "react-icons/gi";
import GetMessage from '../components/contact/GetMessage';
import { FaGripLinesVertical } from "react-icons/fa";
import { FaGripVertical } from "react-icons/fa";
import { FaMicrochip } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { VscGitCommit } from "react-icons/vsc";




function Contact() {

  const fontStyle = 'a6 text-white dark:text-gray-300'
  const iconStyle = 'a6 text-white dark:text-gray-200'
  const bgStyle = ""


  return (
    <div className='h-full bg-slate-800 '>

      <section className="h-full max-w-[85%] mx-auto px-5 py-20 dark:bg-slate-800 bg-slate-800">
        {/* Section Header */}
        <div className="text-center mb-15">
          <h2 className="text-4xl font-bold dark:text-slate-200 text-gray-900 mb-4 a6">
            Get In Touch
          </h2>
          <p className="text-xl dark:text-slate-300 text-slate-600 max-w-2xl mx-auto a6">
            Have a question or want to work together? I'd love to hear from you.
            Send me a message and I'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Container */}
        <div className={`grid grid-cols-1 grid-rows-2 xl:grid-rows-1 xl:grid-cols-2`}>


          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 xl:gap-2 gap-15 items-start grid-rows-auto col-span-1 row-span-1">

            <div className='bg-none col-span-2 row-span-1'>
              <ContactInfo fontStyle={fontStyle}></ContactInfo>

            </div>

            {/* <div className='bg-none col-span-1 h-full row-span-1 flex flex-col justify-center items-center'>
           <VscGitCommit size="60%" className={iconStyle}/>
          <FaGripLinesVertical size="40%" className={iconStyle}/>

        </div> */}

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-2 xl:gap-2 gap-15 items-start col-span-1 row-span-1">

            {/* <div className='bg-none col-span-1 h-full row-span-1 flex flex-col justify-center items-center'>
          

        </div> */}

            {/* getMessage container */}
            <div className="bg-none xl:pl-10 pl-0 md:col-start-2 col-start-1 xl:col-start-auto md:col-span-2 col-span-1 rounded-2xl">
              <GetMessage bgStyle='bg-none' fontStyle={fontStyle}></GetMessage>

            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Contact;