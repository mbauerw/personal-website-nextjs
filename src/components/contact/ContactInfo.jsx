import { Mail, Phone, MapPin } from "lucide-react";
import { forwardRef } from "react";
import Logos from "../Logos";

const ContactInfo = forwardRef(({ height = "h-full", width = "w-full", fontStyle="", className="" }, ref) => {

  return(
  <div className={`bg-none ${height} ${width} grid grid-rows-[70px_1fr_1fr_1fr] grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-5`}>
    <div className="h-full flex justify-center items-start w-full">
      <h3 className={`text-3xl g4 font-semibold text-gray-900 mb-6 col-span-full row-span-1 p-5 ${fontStyle}`}>
        Contact Information
      </h3>
    </div>
    
    <div className="flex items-center justify-start py-4 border-b border-slate-200 last:border-b-0">
      <div className="w-1/5 flex justify-center">
        <Mail  size="50px" className={fontStyle}/>
      </div>
      
      <div className="w-4/5 flex justify-start">
        <p className={`text-slate-200 text-2xl g4 ${fontStyle}`}> max.bauer.wd@gmail.com</p>
      </div>
    </div>
    <div className="flex items-center py-4 border-b border-slate-200 last:border-b-0">
      <div className="w-1/5 flex justify-center">
        <Phone className={fontStyle} size="50px"/>
      </div>
      <div className="w-4/5 flex justify-start">
        <p>
          <a href="tel:+1234567890" className={`text-white hover:text-purple-600 transition-colors duration-200 text-2xl g4 ${fontStyle}`}>
            +1 (517) 802-1485
          </a>
        </p>

      </div>
      
    </div>
    <div className="flex items-center py-4 border-b border-slate-200 last:border-b-0">
    <div className="w-1/5 flex justify-center">
        <MapPin className={fontStyle} size="50px"/> 
      </div>
      <div className="w-4/5 flex justify-start">
        <p>
          <a href="tel:+1234567890" className={`text-white hover:text-purple-600 transition-colors duration-200 text-2xl g4 ${fontStyle}`}>
            Lansing, MI
          </a>
        </p>

      </div>
    </div>
    <div className="col-span-full h-full flex items-center justify-center py-4 border-b border-slate-200 last:border-b-0">
      <Logos position={"relative h-full"} showElement={true} iconSize={"w-10 h-10 hover:text-neutral-600 transition-[color] duration-400"}/>
    </div>
    

  </div>
    
  )
  }
)

export default ContactInfo;


  // <div ref={ref} className={ `  p-10 bg-white rounded-2xl shadow-md ${height} ${width} `}> 
  
    
  //   <div className="space-y-6">
  //     {/* Email */}
  //     <div className="flex items-center py-4 border-b border-slate-200 last:border-b-0">
  //       <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
  //         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  //         </svg>
  //       </div>
  //       <div>
  //         <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
  //         <p>
  //           <a href="mailto:hello@yourname.com" className="text-indigo-500 hover:text-purple-600 transition-colors duration-200">
  //             hello@yourname.com
  //           </a>
  //         </p>
  //       </div>
  //     </div>

  //     {/* Phone */}
  //     <div className="flex items-center py-4 border-b border-slate-200 last:border-b-0">
  //       <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
  //         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
  //         </svg>
  //       </div>
  //       <div>
  //         <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
  //         <p>
  //           <a href="tel:+1234567890" className="text-indigo-500 hover:text-purple-600 transition-colors duration-200">
  //             +1 (234) 567-8900
  //           </a>
  //         </p>
  //       </div>
  //     </div>

  //     {/* Location */}
  //     <div className="flex items-center py-4 border-b border-slate-200 last:border-b-0">
  //       <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
  //         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
  //         </svg>
  //       </div>
  //       <div>
  //         <h4 className="font-semibold text-gray-900 mb-1">Location</h4>
  //         <p className="text-slate-600">San Francisco, CA</p>
  //       </div>
  //     </div>

  //     {/* Response Time */}
  //     <div className="flex items-center py-4 border-b border-slate-200 last:border-b-0">
  //       <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
  //         <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
  //         </svg>
  //       </div>
  //       <div>
  //         <h4 className="font-semibold text-gray-900 mb-1">Response Time</h4>
  //         <p className="text-slate-600">Within 24 hours</p>
  //       </div>
  //     </div>
  //   </div>

  //   {/* Social Links */}
  //   <div className="mt-8 pt-8 border-t border-slate-200">
  //     <h4 className="font-semibold text-gray-900 mb-4">Follow Me</h4>
  //     <div className="flex gap-4">
  //       <a href="#" className="w-12 h-12 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:border-indigo-500 transform hover:-translate-y-1 transition-all duration-200 group" aria-label="LinkedIn">
  //         <svg className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
  //           <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  //         </svg>
  //       </a>
  //       <a href="#" className="w-12 h-12 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:border-indigo-500 transform hover:-translate-y-1 transition-all duration-200 group" aria-label="Twitter">
  //         <svg className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
  //           <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  //         </svg>
  //       </a>
  //       <a href="#" className="w-12 h-12 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:border-indigo-500 transform hover:-translate-y-1 transition-all duration-200 group" aria-label="GitHub">
  //         <svg className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
  //           <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  //         </svg>
  //       </a>
  //       <a href="#" className="w-12 h-12 bg-slate-50 border-2 border-slate-200 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:border-indigo-500 transform hover:-translate-y-1 transition-all duration-200 group" aria-label="Instagram">
  //         <svg className="w-6 h-6 text-slate-600 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
  //           <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  //         </svg>
  //       </a>
  //     </div>
  //   </div>
  // </div>
